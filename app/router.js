import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('gradients');
  this.route('gradient', { path: '/:gradient_id' });
});

export default Router;
