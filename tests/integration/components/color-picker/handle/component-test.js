import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('color-picker/handle', 'Integration | Component | color picker/handle', {
  integration: true
});

/**
 * @param Number bottomPosition 	Bottom position in px
 * @return Boolean 
 *
 * Returns true if the element is in the correct position relative to its parent 
 */
function getHeightPositionAssertion(bottomPosition) {
	let $el = this.$().find('.color-picker__handle');
	// the 2px offset here is to account for the handle's 1px border
	return $el.position().top === 100 + (-bottomPosition - 2);
}

[
	0, 23, 87, 34, 26, 1, 95, 72
].forEach(bottomPosition => {
	test('it renders at the correct height', function(assert) {
		// Given there is a color picker slider handle
		// And it is set with a bottom position
		// And its parent height is 100px
		this.set('bottom', bottomPosition);

		// When I view the component
		this.render(hbs`
			<div class="color-picker">
				<div class="color-picker__slider" style="height: 100px; position: absolute;">
					{{color-picker/handle
						bottom=bottom
						parentHeight=100
					}}
				</div>
			</div>
		`);

		// Then the handle should be ar the correct height
		assert.ok(getHeightPositionAssertion.call(this, bottomPosition), 
			`It should render with the handle at the correct height when the bottom is set to ${bottomPosition}.`);
	});

	test("it sends its new position on drag events", function(assert) {
		// Given there is a color picker slider handle
		let didFire = false;
		let newPositionAfterDrag = null;

		// And it is initially positioned at the bottom
		this.set('bottom', 0);

		this.set('onMove', (newPosition) => {
			didFire = true;
			newPositionAfterDrag = newPosition;
			this.set('bottom', 100 - newPosition);
		});

		// When I view the component
		this.render(hbs`
			<div class="color-picker">
				<div class="color-picker__slider" style="height: 100px; position: absolute;">
					{{color-picker/handle
						bottom=bottom
						parentHeight=100
						onMove=(action onMove)
					}}
				</div>
			</div>
		`);

		// And I drag the handle a certain distance
		let $el = this.$().find('.color-picker__handle');
		$el.simulate('drag', {
			dx: 0,
			dy: -bottomPosition
		});

		// Then it should send its new position on drag events 
		assert.ok(didFire,
			"It should send its new position on drag events");

		// And it should move the the correct position
		assert.ok(getHeightPositionAssertion.call(this, 100 - bottomPosition - 2),
			"It should send its new position on drag events");
	});	
});

