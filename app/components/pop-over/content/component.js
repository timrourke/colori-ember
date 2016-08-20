import Ember from 'ember';
import OnClickElsewhere from 'color-storm/mixins/on-click-elsewhere';
import { didAttrUpdate } from 'color-storm/utils/did-attr-update';

const { Component, on } = Ember;
const { bool, equal } = Ember.computed;
const { next } = Ember.run;

export default Component.extend(OnClickElsewhere, {
	autoAlign: false,
  classNames: ['pop-over__content'],
	classNameBindings: [
		'isAutoAligned:pop-over__content--auto-aligned',
		'isHorizontallyAlignedCenter:pop-over__content--center',
		'isHorizontallyAlignedLeft:pop-over__content--left',
		'isHorizontallyAlignedRight:pop-over__content--right',
		'isTransparent:pop-over__content--transparent',
		'isVerticallyAlignedBottom:pop-over__content--bottom',
		'isVerticallyAlignedMiddle:pop-over__content--middle',
		'isVerticallyAlignedTop:pop-over__content--top'
	],
	horizontalAlignment: 'center',
	isTransparent: false,
	verticalAlignment: 'top',
  showContent: false,

	isAutoAligned: 								bool('autoAlign'),
	isHorizontallyAlignedCenter: 	equal('horizontalAlignment', 'center'),
	isHorizontallyAlignedLeft: 		equal('horizontalAlignment', 'left'),
	isHorizontallyAlignedRight: 	equal('horizontalAlignment', 'right'),
	isVerticallyAlignedBottom: 		equal('verticalAlignment', 'bottom'),
	isVerticallyAlignedMiddle:		equal('verticalAlignment', 'middle'),
	isVerticallyAlignedTop: 			equal('verticalAlignment', 'top'),

	/**
	 * Perform collision detection to auto-align element relative to parent
	 */
	autoAlignElement() {
		let $el = this.$();
		let offset = $el.offset();
		let width = $el.width();
		let height = $el.height();
		let bodyWidth = Ember.$('body').width();
		let bodyHeight = Ember.$('body').height();
		let right = offset.left + width;
		let bottom = offset.top + height;
		
		if (right > bodyWidth) {
			this.set('horizontalAlignment', 'right');
		} else if (offset.left < 0) {
			this.set('horizontalAlignment', 'left');
		}

		if (bottom > bodyHeight) {
			this.set('verticalAlignment', 'top');
		} else if (offset.top < 0) {
			this.set('verticalAlignment', 'bottom');
		}

		this.set('isTransparent', false);
	},

	init() {
		this._super(...arguments);

		// Initially hide component before doing auto-alignment
		if (this.get('autoAlign')) {
			this.set('isTransparent', true);
		}
	},

	/**
	 * @event didUpdateAttrs
	 *
	 * Handle auto-alignment when attributes are updated
	 */
	handleAutoAlignElement: on('didUpdateAttrs', function(attrs) {
		if (!this.get('autoAlign') || !didAttrUpdate(attrs, 'showContent')) {
			return;
		}
		
		let isShowing = (attrs.newAttrs.hasOwnProperty('showContent')) ?
			attrs.newAttrs.showContent.value :
			false;

		if (isShowing) {
			next(() => {
				this.autoAlignElement();
			});
		} else {
			next(() => {
				this.resetAutoAlignment();
			});
		}
	}),

	/**
	 * Hide content on click elsewhere
	 */
  onClickElsewhere() {
    this.set('showContent', false);
  },

	/**
	 * Reset alignment properties to default state if popover is auto-aligned
	 */
	resetAutoAlignment() {
		if (!this.get('autoAlign')) {
			return;
		}

		this.setProperties({
			horizontalAlignment: 'center',
			verticalAlignment: 'top',
			isTransparent: true
		});
	},

	willDestroyElement() {
		this.resetAutoAlignment();
	}
});
