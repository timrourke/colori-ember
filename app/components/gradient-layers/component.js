import Ember from 'ember';

const { Component, run } = Ember;
const { scheduleOnce } = run;

export default Component.extend({
  activeGradientLayerId: null,
  classNames: ['gradient-layers'],
  cloneTop: null,
  cloneDeltaY: 0,
  cloneGradientLayer: null,
  gradientLayers: [],
  gradientLayerCloneCss: null,
  isCloneActive: false,
  mousePos: null,

  actions: {
    /**
     * @param Object offset  jQuery element offset() object
     * @param gradient-layer gradientLayer   gradient-layer
     *
     * Initialize the gradient-layer-clone with its position and the CSS string
     * for displaying the dragged gradient layer's current gradient styles
     */
    initClone(offset, gradientLayer) {
      console.log('initing clone', offset);
      this.set('isCloneActive', true);
      this.set('gradientLayerCloneCss', gradientLayer.get('gradientCssString'));
      this.set('cloneTop', offset);
      this.set('cloneDeltaY', 0);
      this.set('cloneGradientLayer', gradientLayer);
      
      scheduleOnce('afterRender', this, () => {
        this.$('#gradient-layer-clone').css({
          'top': `${offset}px`
        });
      });
    },

    /**
     * Hide the dragged gradient-layer-clone
     */
    hideClone() {
      this.set('cloneTop', 0);
      this.set('cloneDeltaY', 0);
      this.set('cloneGradientLayer', null);
      this.set('gradientLayerCloneCss', null);
      this.set('isCloneActive', false);
    },

    /**
     * @param Integer top   Pixel coordinate for top of element
     * @param Integer mousePos   event.clientY
     * @param Boolean deltaY  The ∆Y
     *
     * Move the dragged gradient-layer-clone to a new Y position
     */
    moveClone(top, mousePos, deltaY) {
      this.set('cloneTop', top);
      this.set('mousePos', mousePos);
      if (deltaY) {
        this.set('cloneDeltaY', deltaY);
      }
      this.$('#gradient-layer-clone').css('top', `${top}px`);
    },

    /**
     * @param gradient-layer gradientLayer  The gradient-layer to set as active
     *
     * Set a gradient-layer instance as the active layer in the editor
     */
    setActiveGradientLayer(gradientLayer) {
      this.sendAction('setActiveGradientLayer', gradientLayer);
    },

    /**
     * Show the gradient-layer-clone
     */
    showClone() {
      run(() => {
        this.$('#gradient-layer-clone').css({
          'opacity': 1,
          'visibility': 'visible'
        });
      });
    }
  }
});
