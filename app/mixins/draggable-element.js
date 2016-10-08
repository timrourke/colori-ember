import Ember from 'ember';

const { K, Mixin, run } = Ember;
const { scheduleOnce } = run;

export default Mixin.create({
  _isDragging: false,

  init() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, () => {
      Ember.$(document).on(`mouseup.${this.elementId}`, (e) => {
        if (this.isDestroyed || !this.get('_isDragging')) {
          return false;
        }

        this.handleMouseUp(e);
      });

      this.$().on(`mousedown.${this.elementId}`, (e) => {
        if (this.isDestroyed) {
          return false;
        }

        this.handleMouseDown(e);
        
        // Make sure Ember click handler still fires
        if (typeof this.click === 'function') {
          this.click();  
        }
        
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
    this.dragStart(event);
  },

  handleMouseMove(event) {
    if (this.get('_isDragging')) {
      this.dragDrag(event);     
    }
  },

  handleMouseUp(event) {
    this.set('_isDragging', false);
    this.dragEnd(event);
  },

  willDestroyElement() { 
    this._super(...arguments);

    Ember.$(window).off(`.${this.elementId}`);
  },

	dragStart: K,
		// Override in implementation

	dragDrag: K,
		// Override in implementation

	dragEnd: K,
		// Override in implementation

});
