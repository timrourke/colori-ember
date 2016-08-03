import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pop-over/trigger', 'Integration | Component | pop over/trigger', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pop-over/trigger}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pop-over/trigger}}
      template block text
    {{/pop-over/trigger}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
