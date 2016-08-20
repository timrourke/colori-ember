import Ember from 'ember';
import ClickOutside from 'ember-click-outside/mixins/click-outside';
import DraggableElement from 'color-storm/mixins/draggable-element';

const { Component, on, run } = Ember;
const { later, next, scheduleOnce } = run;

export default Component.extend(ClickOutside, DraggableElement, {
  classNames: ['gradient-stop'],
  gradientStop: null,
  popoverAlignment: 'center',
	r: 0,
	g: 0,
	b: 0,
	a: 1,

  _elementWidth: 0,
  _halfElementWidth: 0,
  _parentWidth: 0,

	/**
	 * Initialize the styles for the gradient-stop
	 *
	 * @event init
	 */
  initStyles: on('init', function() {
    this._super(...arguments);
		 
		// Synchronously set styles on init
		this.setStyles();

    // Initialize the gradient-stop's properties to catch any state changes
		// after model loads
    this.get('gradientStop').on('ready', () => {
			this.setStyles();
    });
  }),

  /**
   * Bind outside click handler for closing color picker menu
   */
  _attachClickOutsideHandler: on('didInsertElement', function() {
    next(this, this.addClickOutsideListener);
  }),

  /**
   * Unbind outside click handler for closing color picker menu
   */
  _removeClickOutsideHandler: on('willDestroyElement', function() {
    this.removeClickOutsideListener();
  }),

	/**
	 * Set gradient-stop position and color
	 */
	setStyles() {
		let {
			r, 
			g, 
			b, 
			a,
			color
		} = this.get('gradientStop').getProperties('r', 'g', 'b', 'a', 'color');
		this.setProperties({
			r: r,
			g: g,
			b: b,
			a: a
		});
		scheduleOnce('afterRender', this, () => {
			this.$().css({ 
				left: `${this.get('gradientStop.left')}%`,
				backgroundColor: color
			});
			this.$('button').css({
				border: `2px solid ${color}`
			});
			this.$('button .arrow').css('border-bottom', `6px solid ${color}`);
		});
	},

  /**
   * Simple collision detection for placement of color picker
   */
  testColorPickerPosition() {
    later(this, () => {
			let contentWidth = this.$().find('.pop-over__content').width();
			let offsetLeft = this.$().offset().left;
      let hasRoomToRight = (offsetLeft + contentWidth) < window.innerWidth;
			let hasRoomToLeft = (offsetLeft - contentWidth) > 0;
			if (!hasRoomToRight) {
      	this.set('popoverAlignment', 'right');
			} else if (!hasRoomToLeft) {
				this.set('popoverAlignment', 'left');
			} else {
				this.set('popoverAlignment', 'center');
			}
    }, 200);
  },

	/**
	 * Initialize element's dimensional constraints for managing drag position
	 */
	dragStart() {
		run(() => {
			let width = this.$().width();
			this.set('_elementWidth', width);
			this.set('_halfElementWidth', width / 2);
			this.set('_parentWidth', this.$().parent().width());
		});
	},

	/**
	 * @param Object event  Event object
	 *
	 * Handle lateral dragging of gradient-stop
	 */
	dragDrag(event) {
		let parentWidth = this.get('_parentWidth');
		let middle = this.$().offset().left + this.get('_halfElementWidth');
		let leftPercentage = (event.clientX / parentWidth) * 100;
		let rightPercentage = ((middle) / parentWidth) * 100;
		if (leftPercentage < 0 || rightPercentage > 100) {
			return;
		}

		run(() => {
			this.$().css('left', `${leftPercentage}%`);
			this.set('gradientStop.left', leftPercentage);
		});
	},

	/**
	 * @param Object event  Event object
	 *
	 * Handle dragStop of gradient-stop
	 */
	dragEnd() {
		this.testColorPickerPosition();
	},

  actions: {
    /**
     * @param String color  Color value
     *
     * Update the gradient-stop's color value
     */
    colorChanged: function(r, g, b, a) {
      run(() => {
        this.get('gradientStop').setProperties({
					r: r,
					g: g,
					b: b,
					a: a
				});
				let color = this.get('gradientStop.color');
        this.$().css('backgroundColor', color);
        this.$('button').css({
          border: `2px solid ${color}`
        });
        this.$('button .arrow').css('border-bottom', `6px solid ${color}`);
      });
    },
  }
});
