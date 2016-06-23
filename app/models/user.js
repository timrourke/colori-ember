import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import ModelTimestamps from 'color-storm/mixins/model-timestamps';

export default Model.extend(ModelTimestamps, {
  email:      attr('string'),
  username:   attr('string'),

  gradients: hasMany('gradient'),
});
