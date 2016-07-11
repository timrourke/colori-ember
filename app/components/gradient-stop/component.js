import Ember from 'ember';
import ClickOutside from 'ember-click-outside/mixins/click-outside';
import DraggableElement from 'color-storm/mixins/draggable-element';

const { Component, computed, on, run } = Ember;
const { next, scheduleOnce } = run;

export default Component.extend(ClickOutside, DraggableElement, {
  classNames: ['gradient-stop'],
  color: '',
  gradientStop: null,
  hasRoomToRight: true,
  isShowingColorPicker: false,

  _elementWidth: 0,
  _halfElementWidth: 0,
  _parentWidth: 0,

  /**
   * @property hasRoomToRight
   *
   * Reposition color picker if there isn't room to fit in window
   */
  colorPickerPositionClass: computed('hasRoomToRight', function() {
    if (this.get('hasRoomToRight')) {
      return 'sp-container--left';   
    }
    return 'sp-container--right';
  }),

  initStyles: on('init', function() {
    this._super(...arguments);

    // Initialize the gradient-stop's properties
    this.get('gradientStop').on('ready', () => {
      let color = this.get('gradientStop.color');
      this.set('color', color);
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
   * Close color picker menu when click even fires outside of this element
   */
  clickOutside() {
    run(() => {
      this.set('isShowingColorPicker', false);
    });
  },

  /**
   * Simple collision detection for placement of color picker
   */
  testColorPickerPosition() {
    run(() => {
      let hasRoomToRight = (this.$().offset().left + 240) < window.innerWidth;
      this.set('hasRoomToRight', hasRoomToRight);
    });
  },

  actions: {
    /**
     * @param String color  Color value
     *
     * Update the gradient-stop's color value
     */
    colorChanged: function(color) {
      run(() => {
        this.set('gradientStop.color', color);
        this.$().css('backgroundColor', color);
        this.$('button').css({
          border: `2px solid ${color}`
        });
        this.$('button .arrow').css('border-bottom', `6px solid ${color}`);
      });
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
    dragStop() {
      this.testColorPickerPosition();
    },

    /**
     * Handle click event on gradient-stop
     */
    toggleIsShowingColorPicker() {
      this.toggleProperty('isShowingColorPicker');
      this.testColorPickerPosition();
    }
  }
});
