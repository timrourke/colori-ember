import Ember from 'ember';
import ModelTimestampsMixin from 'color-storm/mixins/model-timestamps';
import { module, test } from 'qunit';

module('Unit | Mixin | model timestamps');

// Replace this with your real tests.
test('it works', function(assert) {
  let ModelTimestampsObject = Ember.Object.extend(ModelTimestampsMixin);
  let subject = ModelTimestampsObject.create();
  assert.ok(subject);
});
