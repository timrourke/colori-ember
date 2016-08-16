import Ember from 'ember';

const { sendEvent, Service } = Ember;
const { debounce, scheduleOnce } = Ember.run;

function sendOnResize() {
	sendEvent(this, 'windowDidResize');
};

export default Service.extend({

	init() {
		this._super(...arguments);

		scheduleOnce('afterRender', this, function() {
			Ember.$(window).on('resize', () => {
				this.sendOnResize();
			});
		});
	},

	sendOnResize() {
		debounce(this, sendOnResize, 500);
	}

});
