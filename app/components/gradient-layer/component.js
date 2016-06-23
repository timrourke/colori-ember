import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  activeGradientLayerId: null,
  classNames: ['gradient-layer'],
  classNameBindings: ['isActive:active'],
  gradientLayer: null,

  isActive: computed('activeGradientLayerId', 'gradientLayer.id', function() {
    return parseInt(this.get('activeGradientLayerId')) === parseInt(this.get('gradientLayer.id'));
  }),
});
