import Ember from 'ember';

const { Mixin, run } = Ember;
const { scheduleOnce } = run;

export default Mixin.create({
  _isDragging: false,

  init() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, () => {
      Ember.$(document).on(`mouseup.${this.elementId}`, (e) => {
        if (this.isDestroyed) {
          return false;
        }
        this.handleMouseUp(e);
      });

      this.$().on(`mousedown.${this.elementId}`, (e) => {
        if (this.isDestroyed) {
          return false;
        }
        this.handleMouseDown(e);
        return false;
      });

      Ember.$(document).on(`mousemove.${this.elementId}`, (e) => {
        if (this.isDestroyed) {
          return false;
        }
        this.handleMouseMove(e);
      });
    });
  },

  handleMouseDown(event) { 
    this.set('_isDragging', true);
    this.send('dragStart', event);
  },

  handleMouseMove(event) {
    if (this.get('_isDragging')) {
      this.send('dragDrag', event);     
    }
  },

  handleMouseUp(event) {
    this.set('_isDragging', false);
    this.send('dragEnd', event);
  },

  willDestroyElement() { 
    this._super(...arguments);

    Ember.$(window).off(`.${this.elementId}`);
  },

  actions: {
    dragStart() {
      // Override in implementation
    },

    dragDrag() {
      // Override in implementation
    },

    dragEnd() {
      // Override in implementation
    },
  }

});
