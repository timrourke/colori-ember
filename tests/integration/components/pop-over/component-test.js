import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { next } = Ember.run;

moduleForComponent('pop-over', 'Integration | Component | pop over', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{pop-over}}`);

  assert.equal(this.$().text().trim(), '');
});

test('it handles clicks', function(assert) {
	// Given there is a popover
	// And the popover is set to hide its content
	this.set('showContent', false);

	// When I view the popover
	this.render(hbs`
		{{#pop-over 
			 showContent=showContent
			 as |popover|
		}}
			{{#popover.trigger}}
				Trigger
			{{/popover.trigger}}
			{{#popover.content}}
				Content
			{{/popover.content}}
		{{/pop-over}}
	`);

	// And I click on the popover trigger
	this.$().find('.pop-over__trigger').click();

	next(this, () => {
		// Then the click should be handled
		assert.ok(this.get('showContent'),
			"It handles clicks.");

		// And I should see the content
		assert.ok(this.$().find('.pop-over__content').length,
			"It shows the content");
	});
});
