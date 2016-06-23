import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import ModelTimestamps from 'color-storm/mixins/model-timestamps';

const { computed } = Ember;

export default Model.extend(ModelTimestamps, {
  angle:          attr('number', { defaultValue: 90 }),
  order:          attr('number', { defaultValue: 0 }),
  gradientType:   attr('string', { defaultValue: 'linear' }),

  gradient:       belongsTo('gradient'),
  gradientStops:  hasMany('gradient-stop'),

  /**
   * @property angle
   *
   * Concatenates 'deg' unit onto angle
   */
  angleDeg: computed('angle', function() {
    return `${this.get('angle')}deg,`;
  }),

  /**
   * @property gradientStops.[]
   * @property gradientStops.length
   * @property gradientStops.firstObject.color
   * @property gradientStops.@each.cssString
   * 
   * Computes the gradient color stops in order from left to right, eg:
   * 'rgba(0, 200, 100, 0.5) 25%, rgba(100, 0, 45) 78%'
   */
  sortedGradientStopsToString: computed('gradientStops.[]',
                                        'gradientStops.length',
                                        'gradientStops.firstObject.color',
                                        'gradientStops.@each.cssString', function() {
    // Fallback to empty string
    if (!this.get('gradientStops')) {
      return '';
    }

    // If only one stop is defined, create a solid field of that color
    if (parseInt(this.get('gradientStops.length'), 10) === 1) {
      let color = this.get('gradientStops.firstObject.color');
      return `${color} 0%, ${color} 100%`;
    }

    return this.get('gradientStops')
      .sortBy('left')
      .map((gs) => {
        return gs.get('cssString');
      }).join(', ');
  }),

  /**
   * @property angleDeg
   * @property sortedGradientStopsToString
   * @property gradientStops.[]
   * @property gradientType
   *
   * Computes the full gradient layer CSS string, eg:
   * 'linear-gradient(37deg, rgba(0, 200, 100, 0.5) 25%, rgba(100, 0, 45) 78%)'
   */
  gradientCssString: computed('angleDeg',
                              'sortedGradientStopsToString',
                              'gradientStops.[]',
                              'gradientType',
                              function() {
    if (!this.get('sortedGradientStopsToString')) {
      return '';
    }

    return `${this.get('gradientType')}-gradient(${this.get('angleDeg')} ${this.get('sortedGradientStopsToString')})`;
  })
});
