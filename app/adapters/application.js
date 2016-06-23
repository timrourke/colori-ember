import JSONAPIAdapter from 'ember-data/adapters/json-api';
// import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from 'color-storm/config/environment';

export default JSONAPIAdapter.extend(/*DataAdapterMixin,*/ {
  // authorizer: 'authorizer:oauth2',
  host: config.DS.host,
  namespace: config.DS.namespace,

  urlForCreateRecord(modelName) {
    switch (modelName) {
      case 'user':
      case 'users':
        return this._super.apply(this, arguments).replace('users', 'register');
      default:
        return this._super(...arguments);
    }
  }
});
