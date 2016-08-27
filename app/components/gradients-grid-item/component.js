import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
	classNames: ['gradients-grid__item'],
	gradient: null,
	tagName: 'li',

	/**
	 * @property gradient.gradientLayers.[]
	 * @property gradient.gradientLayers.@each.order
	 * @property gradient.gradientLayers.@each.angleDeg
	 * @property gradient.gradientLayers.@each.gradientCssString
	 * @return String
	 *
	 * Returns a concatenated string of the gradient layers' CSS styles ordered
	 * by the `order` property of each gradient layer
	 */
  allGradientLayers: computed('gradient.gradientLayers.[]', 
                              'gradient.gradientLayers.@each.order',
                              'gradient.gradientLayers.@each.angleDeg',
                              'gradient.gradientLayers.@each.gradientCssString', function() {
    return this.get('gradient.gradientLayers')
      .sortBy('order')
      .map((gl) => {
        return gl.get('gradientCssString').trim() || gl.get('gradientStops.firstObject.color');
      }).filter((gl) => gl).join(', ');
  }),

});
