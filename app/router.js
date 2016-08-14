import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('gradients', function() {
    this.route('gradient', { path: '/:gradient_id' });  
  });
  this.route('style-guide');
});

export default Router;
