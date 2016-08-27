import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gradients-grid-item', 'Integration | Component | gradients grid item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gradients-grid-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gradients-grid-item}}
      template block text
    {{/gradients-grid-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
