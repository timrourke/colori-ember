import Ember from 'ember';
import DraggableElementMixin from 'colori-ember/mixins/draggable-element';
import { module, test } from 'qunit';

module('Unit | Mixin | draggable element');

// Replace this with your real tests.
test('it works', function(assert) {
  let DraggableElementObject = Ember.Object.extend(DraggableElementMixin);
  let subject = DraggableElementObject.create();
  assert.ok(subject);
});
