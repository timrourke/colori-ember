import Ember from 'ember';
import ClickOutside from 'ember-click-outside/mixins/click-outside';
import DraggableElement from 'color-storm/mixins/draggable-element';

const { Component, on, run } = Ember;
const { next, scheduleOnce } = run;

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
    this.setInitialStyles();

    // Initialize the gradient-stop's properties to catch any state changes
    // after model loads
    this.get('gradientStop').on('ready', () => {
      this.setInitialStyles();
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
   * @param String color  The opaque CSS color value for the gradient stop
   *
   * Set the background color for the gradient stop
   */
  setBackgroundColor(color) {
    this.$('.gradient-stop__background').css('backgroundColor', color);
  },

  /**
   * @param Number r  R value
   * @param Number g  G value
   * @param Number b  B value
   *
   * Set gradient stop's border to the opaque version of the stop's color
   */
  setBorderColor(r, g, b) {
    this.$('.gradient-stop__border').css({
      border: `2px solid rgb(${r}, ${g}, ${b})`
    });
  },  

  /**
   * @param String color  The opaque CSS color value for the gradient stop
   *
   * Set the arrow color for the gradient stop
   */
  setArrowColor(color) {
    this.$('button .arrow').css('border-bottom', `6px solid ${color}`);
  },

  /**
   * Set initial gradient-stop position and color
   */
  setInitialStyles() {
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
      this.setElementBoundaries();
      let halfWidth = this.get('_halfElementWidth');
      let halfPercent = (halfWidth / this.get('_parentWidth')) * 100;

      this.$().css({ 
        left: `${this.get('gradientStop.left') - halfPercent}%`,
      });

      this.setBackgroundColor(color);
      this.setArrowColor(color);
      this.setBorderColor(r, g, b);
    });
  },

  /**
   * Calculate element's size and boundaries
   */
  setElementBoundaries() {  
    let width = this.$().width();
    this.set('_elementWidth', width);
    this.set('_halfElementWidth', width / 2);
    this.set('_parentWidth', this.$().parent().width());
  },

  /**
   * Simple collision detection for placement of color picker
   */
  testColorPickerPosition() {
    next(this, () => {
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
    });
  },

  /**
   * Initialize element's dimensional constraints for managing drag position
   */
  dragStart() {
    run(() => {
      this.setElementBoundaries();
    });
  },

  /**
   * @param Object event  Event object
   *
   * Handle lateral dragging of gradient-stop
   */
  dragDrag(event) {
    let parentWidth = this.get('_parentWidth');
    let halfWidth = this.get('_halfElementWidth');
    let halfPercent = (halfWidth / parentWidth) * 100;
    let middle = this.$().offset().left + halfWidth;
    let leftPercentage = (event.clientX / parentWidth) * 100;
    let rightPercentage = (middle / parentWidth) * 100;

    if (leftPercentage < 0 || rightPercentage > 100) {
      return;
    }

    run(() => {
      this.$().css('left', `${leftPercentage - halfPercent}%`);
      this.set('gradientStop.left', leftPercentage);
    });
  },

  /**
   * Handle dragStop of gradient-stop
   */
  dragEnd() {
    this.testColorPickerPosition();
  },


  actions: {
    /**
     * @param Number r  R value
     * @param Number g  G value
     * @param Number b  B value
     * @param Number a  A value
     *
     * Update the gradient-stop's color value, and adjust its styles
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
        
        this.setBackgroundColor(color);
        this.setArrowColor(color);
        this.setBorderColor(r, g, b);
      });
    },
  }
});
