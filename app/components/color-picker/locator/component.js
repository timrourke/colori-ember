import Ember from 'ember';
import DraggableElement from 'color-storm/mixins/draggable-element';
import { hslToHsb } from 'color-storm/utils/color-converter';

const { Component, on, run } = Ember;
const { scheduleOnce } = run;

export default Component.extend(DraggableElement, {
  classNames: ['color-picker__locator'],
  isSmallSize: false,
  lightness: 0,
  saturation: 0,
  maxPos: 390,

  init() {
    this._super(...arguments);

    // Initialize the locator ring's position after render
    scheduleOnce('afterRender', this, function() {
      this.updatePosition();
    });
  },

  /**
   * @param Object e  jQuery event object
   *
   * Set the locator ring's position on click
   */
  click(e) {
    this.setPosition(e);
  },

  /**
   * @param Object e  jQuery event object
   *
   * Set the locator ring's position to coordinates within the component's
   * bounds and send the new position up to the parent.
   */
  setPosition: function(e) {
    let maxPos = this.get('maxPos');
    let offset = this.$().offset();
    let position = {
      top: e.pageY - offset.top,
      left: e.pageX - offset.left
    };
    if (position.top < 0) {
      position.top = 0;
    }
    if (position.left < 0) {
      position.left = 0;
    }
    if (position.top >= maxPos) {
      position.top = maxPos;
    }
    if (position.left >= maxPos) {
      position.left = maxPos;
    }
    this.$('.color-picker__locator-ring').css(position);
    this.sendAction('onChange', position);
  },

  /**
   * @event didUpdateAttrs
   *
   * Update locator ring's position when coordinates are changed from the outer
   * context
   */
  updatePosition: on('didUpdateAttrs', function() {
    let maxPos = this.get('maxPos');
   
    let [
      saturation,
      brightness 
    ] = hslToHsb(
			this.get('saturation') / 100, 
			this.get('lightness') / 100
		);
    
    let newPos = {
      top: -((brightness * maxPos) - maxPos),
      left: (saturation * maxPos)
    };

    this.$('.color-picker__locator-ring').css(newPos);
  }),

  actions: {
    /**
     * @param Object e  jQuery event object
     *
     * Update the locator ring's position on drag event
     */
    dragDrag(e) {
      this.setPosition(e);
    },
  }
});
