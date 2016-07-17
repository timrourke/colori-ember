import Ember from 'ember';
import DraggableElement from 'color-storm/mixins/draggable-element';

const { Component, on, run } = Ember;
const { scheduleOnce } = run;

export default Component.extend(DraggableElement, {
  classNames: ['color-picker__handle'],
  bottom: 0,

  _elementHeight: 0,
  _elementTop: 0,
  _elementBottom: 0,
  _offset: 0,
  _parentHeight: 360,

  setPosition: on('didUpdateAttrs', function() {
    let bottom = this.get('bottom');
    this.$().attr('style', 
            `bottom: ${bottom}px;`);
  }),

  init() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, function() {
      this.initPosition();
      this.setPosition();
    });
  },

  initPosition(event) {
    let $thisEl = this.$();
    let height = $thisEl.height();
    let top = $thisEl.position().top;
    this.set('_elementHeight', height);
    this.set('_elementTop', top);
    this.set('_elementBottom', top + height);

    if (event) {
      let offset = event.clientY - top - (height/2);
      this.set('_offset', offset);  
      return offset;
    }
  },

  actions: {
    dragStart() {
      this.initPosition(event);
    },

    dragDrag(event) {
      run(() => {
        let offset = this.get('_offset');
        let newPos = event.clientY - offset;

        if (newPos <= 0) {
          newPos = 0;
        }

        if (newPos >= 360) {
          newPos = 360;
        }

        this.sendAction('onMove', -(newPos - 360));
      });
    }
  }
  
});
