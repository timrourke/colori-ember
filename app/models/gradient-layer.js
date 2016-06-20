import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  order:          attr('number'),
  gradientType:   attr('string'),
  gradient:       belongsTo('gradient'),
  gradientStops:  hasMany('gradient-stop'),
});
