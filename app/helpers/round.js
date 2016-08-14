import Ember from 'ember';

export function round(params/*, hash*/) {
  return Math.round(Number(params[0]));
}

export default Ember.Helper.helper(round);
