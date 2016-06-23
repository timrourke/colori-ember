import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import ModelTimestamps from 'color-storm/mixins/model-timestamps';

export default Model.extend(ModelTimestamps, {
  body:             attr('string'),
  bodyAutoprefixed: attr('string'),
  description:      attr('string'),
  permalink:        attr('string'),
  title:            attr('string'),

  user:           belongsTo('user'),
  gradientLayers: hasMany('gradient-layer'),  
});
