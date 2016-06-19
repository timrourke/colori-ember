import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Ember from 'ember';
// import { belongsTo, hasMany } from 'ember-data/relationships';

const { computed } = Ember;

export default Model.extend({
  left: attr('number', { defaultValue: 50 }),
  color: attr('string', { defaultValue: 'rgb(255,255,255)' }),

  cssString: computed('left', 'color', function() {
    return `${this.get('color')} ${this.get('left')}%`;
  }),
});
