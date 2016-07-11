import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gradient-layer-clone', 'Integration | Component | gradient layer clone', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gradient-layer-clone}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gradient-layer-clone}}
      template block text
    {{/gradient-layer-clone}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
