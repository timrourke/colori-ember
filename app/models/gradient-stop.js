import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Ember from 'ember';
import { belongsTo } from 'ember-data/relationships';
import ModelTimestamps from 'color-storm/mixins/model-timestamps';

const { computed } = Ember;

export default Model.extend(ModelTimestamps, {
  left:   attr('number'),
  color:  attr('string'),

  gradientLayer: belongsTo('gradient-layer', {async: true}),

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
