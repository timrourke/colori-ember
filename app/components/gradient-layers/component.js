import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  activeGradientLayerId: null,
  classNames: ['gradient-layers'],
  gradientLayers: [],

  actions: {
    setActiveGradientLayer(gradientLayer) {
      this.sendAction('setActiveGradientLayer', gradientLayer);
    }
  }
});
