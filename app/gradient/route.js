import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({

  model(params) {
    return this.store.peekRecord('gradient', params.gradient_id);
  },

  setupController(controller, model) {
    controller.set('gradient', model);
  },

  actions: {
    addGradientStop() {
      this.store.createRecord('gradient-stop', {
        gradientLayer: this.get('controller.activeGradientLayer')
      });
    },

    addGradientLayer() {
      let order = this.get('controller.gradient.gradientLayers')
        .sortBy('order')
        .get('lastObject.order');
      
      this.store.createRecord('gradient-layer', {
        order: parseInt(order, 10) + 1,
        gradient: this.get('controller.gradient')
      });
    }
  }

});
