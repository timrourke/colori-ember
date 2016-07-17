import Ember from 'ember';
import DraggableElement from 'color-storm/mixins/draggable-element';

const { Component, on, run } = Ember;
const { scheduleOnce } = run;

export default Component.extend(DraggableElement, {
  classNames: ['color-picker__handle'],
  bottom: 0,
  parentHeight: 360,

  _elementHeight: 0,
  _elementTop: 0,
  _elementBottom: 0,
  _offset: 0,

  init() {
    this._super(...arguments);

    // Initialize the slider's element bounds and handle position after render
    scheduleOnce('afterRender', this, function() {
      this.initPosition();
      this.setPosition();
    });
  },

  /**
   * @event didUpdateAttrs
   *
   * Update the slider's handle position when changed from the outer context
   */
  setPosition: on('didUpdateAttrs', function() {
    let bottom = this.get('bottom');
    this.$().attr('style', `bottom: ${bottom}px;`);
  }),

  /**
   * @param Object e  jQuery event object
   *
   * Initialize the component's bounds
   */
  initPosition(e) {
    run(() => {
      let $thisEl = this.$();
      let height = $thisEl.height();
      let top = $thisEl.position().top;
      this.set('_elementHeight', height);
      this.set('_elementTop', top);
      this.set('_elementBottom', top + height);

      if (e) {
        let offset = e.clientY - top - (height/2);
        this.set('_offset', offset);  
        return offset;
      }
    });
  },

  actions: {
    /**
     * @param Object e  jQuery event object
     *
     * Reinitialize component's bounds on drag start
     */
    dragStart(e) {
      this.initPosition(e);
    },

    /**
     * @param Object e  jQuery event object
     *
     * Update handle's position on drag and send new position up to parent
     */
    dragDrag(e) {
      run(() => {
        let offset = this.get('_offset');
        let maxHeight = this.get('parentHeight');
        let newPos = e.clientY - offset;

        if (newPos <= 0) {
          newPos = 0;
        }
        if (newPos >= maxHeight) {
          newPos = maxHeight;
        }

        this.sendAction('onMove', -(newPos - maxHeight));
      });
    }
  }
  
});
