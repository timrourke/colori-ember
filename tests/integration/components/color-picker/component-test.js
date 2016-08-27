import { moduleForComponent, test } from 'ember-qunit';
import PageObject from 'color-storm/tests/page-object';
import colorPickerPageObj from 'color-storm/tests/pages/components/color-picker';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

const page = PageObject.create({
	colorPicker: colorPickerPageObj
});

moduleForComponent('color-picker', 'Integration | Component | color picker', {
  integration: true,
  
  beforeEach() {
  	page.setContext(this);
  },
  
  afterEach() {
  	page.removeContext();
  }
});

/*
 	showInputs 	hex			hsb 		hsl 		rgb
*/
[
	[false, 		false, 	false, 	false,	false],
	[true, 			false, 	false, 	false, 	false],
	[true, 			true, 	false, 	false, 	false],
	[true, 			false, 	true, 	false, 	false],
	[true, 			false, 	false, 	true, 	false],
	[true, 			false, 	false, 	false, 	true],
	[true, 			false, 	false, 	false, 	false],
	[true, 			true, 	true, 	true, 	true]
].forEach(testCase => {
	test('it should show and hide the text inputs', function(assert) {
		// Given there is a color-picker component
		let [
			showInputs,
			showInputsHex,
			showInputsHsb,
			showInputsHsl,
			showInputsRgb,
			showInputsAlpha
		] = testCase;

		// And it is configured to show or hide inputs
		this.set('showInputs', showInputs);
		this.set('showInputsHex', showInputsHex);
		this.set('showInputsHsb', showInputsHsb);
		this.set('showInputsHsl', showInputsHsl);
		this.set('showInputsRgb', showInputsRgb);
		this.set('showInputsAlpha', showInputsAlpha);

		// When I view the component
		page.render(hbs`
			{{color-picker
				showAlpha=showAlpha
				showInputs=showInputs
				showInputsHex=showInputsHex
				showInputsHsb=showInputsHsb
				showInputsHsl=showInputsHsl
				showInputsRgb=showInputsRgb
				showInputsAlpha=showInputsAlpha
			}}
		`);

		// Then the inputs should have the correct visibility
		assert.equal(page.colorPicker.inputs.isVisible,
			showInputs,
			`I should ${(showInputs) ? "" : "not"} see the inputs.`);
		
		assert.equal(this.$().find('#color-picker__input-HEX').length,
			showInputsHex,
			`I should ${(showInputsHex) ? "" : "not"} see the input for HEX values.`);
		
		assert.equal(page.colorPicker.inputs.inputsHsb.isVisible,
			showInputsHsb,
			`I should ${(showInputsHsb) ? "" : "not"} see the input for HSB values.`);
		
		assert.equal(page.colorPicker.inputs.inputsHsl.isVisible,
			showInputsHsl,
			`I should ${(showInputsHsl) ? "" : "not"} see the input for HSL values.`);

		assert.equal(page.colorPicker.inputs.inputsRgb.isVisible,
			showInputsRgb,
			`I should ${(showInputsRgb) ? "" : "not"} see the input for RGB values.`);
	});
});

[// r 		g 		b			a 	 	h 			s 			l
	[	37, 	120, 	46, 	0.5, 	126.51, 52.87,	30.78],
	[	201, 	12, 	9, 		0.73, 0.94, 	91.43, 	41.17],
	[	240, 	2, 		76, 	1, 		341.35, 98.35, 	47.45]
].forEach(testCase => {
	test('it sets RGBA values on text input', function(assert) {
		let [
			r,
			g,
			b,
			a,
			hue,
			saturation,
			lightness
		] = testCase;

		this.setProperties({
			r: 0,
			g: 0,
			b: 0,
			alpha: 1,
			hue: 0,
			saturation: 0,
			lightness: 0
		});

		page.render(hbs`
			{{color-picker
				r=r
				g=g
				b=b
				hue=hue
				saturation=saturation
				lightness=lightness
				alpha=a
				showInputs=true
				showInputsHex=true
				showInputsHsb=true
				showInputsHsl=true
				showInputsRgb=true
				showInputsAlpha=true
			}}
		`);

		assert.ok(true,
			"I should see the inputs.");

		this.$('#color-picker__input-R').val(r).change().trigger('keydown');
		this.$('#color-picker__input-G').val(g).change().trigger('keydown');
		this.$('#color-picker__input-B').val(b).change().trigger('keydown');
		this.$('#color-picker__input-A1').val(a).change().trigger('keydown');
		
		return wait().then(() => {
			assert.deepEqual([
					Math.round(this.get('r')),
					Math.round(this.get('g')),
					Math.round(this.get('b')),
					parseFloat(this.get('a'), 10)
				],
				[r, g, b, a],
				"The RGBA values should have been correctly set.");

			assert.deepEqual([
					parseFloat(this.get('hue')),
					parseFloat(this.get('saturation')),
					parseFloat(this.get('lightness'))
				],
				[
					hue,
					saturation,
					lightness
				],
				"The HSL values should have been correctly set."
			);
		});
	});
});