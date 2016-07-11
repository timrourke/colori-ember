import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return [];
  },

  renderTemplate() {
    this.render('index', {
      outlet: 'main',
      into: 'application',
    });
  },

  actions: {
    addGradientStop() {
      let gradientStop = this.store.createRecord('gradient-stop');
      this.get('controller.gradientStops').pushObject(gradientStop);
    }
  }

});
