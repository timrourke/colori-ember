import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  activeGradientLayer: computed('gradient.gradientLayers.firstObject', {
    get() {
      return this.get('gradient.gradientLayers.firstObject');
    },
    set(key, value) {
      return value;
    }
  }),

  allGradientLayers: computed('activeGradientLayer',
                              'gradient.gradientLayers.[]', 
                              'gradient.gradientLayers.@each.order',
                              'gradient.gradientLayers.@each.angleDeg',
                              'gradient.gradientLayers.@each.gradientCssString', function() {
    return this.get('gradient.gradientLayers')
      .sortBy('order')
      .map((gl) => {
        return gl.get('gradientCssString').trim() || gl.get('gradientStops.firstObject.color');
      }).filter((gl) => gl).join(', ');
  }),

  gradientStopsAsc: computed('activeGradientLayer.gradientStops.@each.left', function() {
    return this.get('activeGradientLayer.gradientStops').sortBy('left');
  }),

  gradientStopsMax: computed('activeGradientLayer.gradientStops.length', function() {
    return this.get('activeGradientLayer.gradientStops.length') - 1;
  }),

  gradientLayersMax: computed('gradient.gradientLayers.length', function() {
    return this.get('gradient.gradientLayers.length') - 1;
  }),

  actions: {
    setActiveGradientLayer(gradientLayer) {
      this.set('activeGradientLayer', gradientLayer);
    }
  }
});
