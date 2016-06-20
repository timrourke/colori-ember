import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  body:             attr('string'),
  bodyAutoprefixed: attr('string'),
  description:      attr('string'),
  permalink:        attr('string'),
  title:            attr('string'),

  author:         belongsTo('user'),
  gradientLayers: hasMany('gradient-layer'),  
});
