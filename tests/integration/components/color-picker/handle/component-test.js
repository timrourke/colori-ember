import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('color-picker/handle', 'Integration | Component | color picker/handle', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{color-picker/handle}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#color-picker/handle}}
      template block text
    {{/color-picker/handle}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
