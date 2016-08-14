import Ember from 'ember';

const { Component, computed } = Ember;
const { bool } = computed;

export default Component.extend({
	classNames: ['fancy-input'],
	inputClass: "",
	inputHasFocus: false,
	inputId: "",
	labelText: "",
	inputValue: null,
	placeholderText: "",

	inputClasses: computed('inputHasContent', 'inputClass', function() {
		let hasContentClass = (this.get('inputHasContent')) ? 
			"has-content" :
			"";
		return [hasContentClass, this.get('inputClass')].join(' ');
	}),

	inputHasContent: bool('inputValue'),

	actions: {
		inputGotFocus: function() {
			this.set('inputHasFocus', true);
		},

		inputLostFocus: function() {
			this.set('inputHasFocus', false);
		}
	}
});
