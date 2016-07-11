import Ember from 'ember';
import { didAttrUpdate } from 'color-storm/utils/did-attr-update';
import DraggableElement from 'color-storm/mixins/draggable-element';

const { Component, computed, run } = Ember;
const { scheduleOnce } = run;

function isPositionBetween(position, min, max) {
  return (position > min && position < max);
}

export default Component.extend(DraggableElement, {
  activeGradientLayerId: null,
  classNames: ['gradient-layer'],
  classNameBindings: ['isActive:active', '_isDragging:dragging'],
  cloneTop: null,
  cloneDeltaY: null,
  cloneGradientLayer: null,
  gradientLayer: null,
  mousePos: null,

  _elementHeight: 0,
  _elementTop: 0,
  _elementBottom: 0,
  _parentHeight: 0,

  isActive: computed('activeGradientLayerId', 
                     'gradientLayer.id', 
                     function() {
    let activeLayerId = parseInt(this.get('activeGradientLayerId'));
    let currentGradientId = parseInt(this.get('gradientLayer.id'));
    
    return activeLayerId === currentGradientId;
  }),

  didUpdateAttrs(attrs) {
    if (didAttrUpdate(attrs, 'order')) { 
      scheduleOnce('afterRender', this, function() {
        this.initPosition();
      });
    }

    if (didAttrUpdate(attrs, 'mousePos')) {
      let mousePos = this.get('mousePos');
      let top = this.get('_elementTop');
      let bottom = this.get('_elementBottom');
      if (isPositionBetween(mousePos, top, bottom)) {
        this.sendAction('swapOrder', 
          this.$(), this.get('gradientLayer'), this.get('cloneGradientLayer'));
      }
    }
  },

  init() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, function() {
      this.initPosition();
    });
  },

  initPosition(event) {
    let $thisEl = this.$();
    let height = $thisEl.height();
    let top = $thisEl.offset().top;
    this.set('_elementHeight', height);
    this.set('_elementTop', top);
    this.set('_elementBottom', top + height);
    this.set('_parentHeight', $(window).height());

    if (event) {
      let offset = event.clientY - top;
      this.set('_offset', offset);  
      return offset;
    }
  },

  actions: {
    dragStart(event) {
      if (this.get('isCloneActive')) {
        return;
      }
      run(() => {
        let offset = this.initPosition(event);
        this.sendAction('initClone', offset, this.get('gradientLayer'));
      });  
    },

    dragDrag(event) {
      if (!this.get('cloneTop')) {
        this.sendAction('showClone');
      }

      run(() => {
        let dy = (event.originalEvent.movementY > 0) ? 
          1 : (event.originalEvent.movementY < 0) ? 
          -1 : 0;
        let offset = this.get('_offset');

        this.sendAction('moveClone', event.clientY - offset, event.clientY, dy);
      });
    },

    dragEnd() {
      this.sendAction('hideClone');
    }  
  }
});
