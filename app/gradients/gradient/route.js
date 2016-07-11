import Ember from 'ember';

const { Route, run } = Ember;
const { scheduleOnce } = run;

export default Route.extend({
  _isSwappingOrder: false,

  model(params) {
    return this.store.findRecord('gradient', params.gradient_id);
  },

  renderTemplate() {
    this.render('gradients.gradient', {
      outlet: 'main',
      into: 'application',
    });
  },

  setupController(controller, model) {
    controller.set('gradient', model);
  },

  actions: {
    addGradientStop() {
      this.store.createRecord('gradient-stop', {
        left: 50,
        color: 'rgb(255,255,255)',
        gradientLayer: this.get('controller.activeGradientLayer')
      });
    },

    addGradientLayer() {
      let order = this.get('controller.gradient.gradientLayers')
        .sortBy('order')
        .get('lastObject.order');
      
      let newGradientLayer = this.store.createRecord('gradient-layer', {
        order: parseInt(order, 10) + 1,
        gradient: this.get('controller.gradient')
      });

      this.get('controller').send('setActiveGradientLayer', newGradientLayer);
    },

    swapOrder(gradientLayerEl, gradientLayer, cloneGradientLayer) {
      if (this.get('_isSwappingOrder')) {
        return;
      }
      if (gradientLayer.get('id') === cloneGradientLayer.get('id')) {
        return;
      }
      this.set('_isSwappingOrder', true);
      run(() => {
        let distance = '+=60px';
        let srcOrder = cloneGradientLayer.get('order');
        let destOrder = gradientLayer.get('order');
        if (srcOrder < destOrder) {
          distance = '-=60px';
        }
        gradientLayerEl.velocity({
          top: distance,
        },{
          complete: () => {
            // Remove transforms from animation
            scheduleOnce('render', this, function() {
              gradientLayerEl.attr('style', '');
            });
            
            // Reorder array of gradient layers
            scheduleOnce('afterRender', this, function() {
              gradientLayer.set('order', srcOrder);
              cloneGradientLayer.set('order', destOrder);
              this.set('_isSwappingOrder', false);
            });
          },
        });
      });
    }
  }

});
