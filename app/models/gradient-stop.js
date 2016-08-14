import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Ember from 'ember';
import { belongsTo } from 'ember-data/relationships';
import ModelTimestamps from 'color-storm/mixins/model-timestamps';

const { computed } = Ember;

export default Model.extend(ModelTimestamps, {
  left:   attr('number'),
  r:  		attr('number'),
  g:  		attr('number'),
  b:  		attr('number'),
	a: 			attr('number'),

  gradientLayer: belongsTo('gradient-layer', {async: true}),

	/**
	 * @property r
	 * @property g
	 * @property b
	 * @property a
	 *
	 * Computes the rgba value string for the gradient stop
	 */
	color: computed('r', 'g', 'b', 'a', function() {
		let {
			r,
			g,
			b,
			a
		} = this.getProperties('r', 'g', 'b', 'a');
		return `rgba(${r},${g},${b},${a})`; 
	}),

  /**
   * @property left
   * @property color
   *
   * Computes the color stop's CSS string, eg:
   * 'rgba(255, 137, 8, 0.21) 20%'
   */
  cssString: computed('left', 'color', function() {
    return `${this.get('color')} ${this.get('left')}%`;
  }),
});
