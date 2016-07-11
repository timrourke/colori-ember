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
    controller.set('gradients', model);
  }

});
