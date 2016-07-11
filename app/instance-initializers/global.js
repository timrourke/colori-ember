export function initialize(application) {
  window.EmberApp = application;  // or window.Whatever
}

export default {
  name: 'global',
  initialize: initialize
};