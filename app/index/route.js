import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return [];
  },

  setupController() {
    //
  },

  actions: {
    addGradientStop() {
      let gradientStop = this.store.createRecord('gradient-stop');
      this.get('controller.gradientStops').pushObject(gradientStop);
    }
  }

});
