import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({

  model() {
    return this.store.findAll('gradient');
  },

  renderTemplate() {
    this.render('gradients', {
      outlet: 'main'
    });
  },

  setupController(controller, model) {
		// Display only those gradients that have been saved
    controller.set('gradients', model.filter(m => !m.get('isNew')));
  }

});
