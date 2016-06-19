import Ember from 'ember';

const { Controller, computed } = Ember;
const { htmlSafe } = Ember.String;

export default Controller.extend({
  angle: 0,
  gradientStops: [],

  gradientStopsAsc: computed('gradientStops.@each.left', function() {
    return this.get('gradientStops').sortBy('left');
  }),

  gradientStopsMax: computed('gradientStops.length', function() {
    return this.get('gradientStops.length') - 1;
  }),

  gradientCss: computed('gradientStopsAsc.[]', 'gradientStops.@each.cssString', function() {
    let cssArray = this.get('gradientStopsAsc').map(o => {
      return o.get('cssString');
    });
    return htmlSafe(cssArray.join(',\n'));
  }),
});
