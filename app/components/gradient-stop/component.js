import Ember from 'ember';
import ClickOutside from 'ember-click-outside/mixins/click-outside';
import DraggableElement from 'colori/mixins/draggable-element';

const { Component, observer, on, run } = Ember;
const { next, scheduleOnce } = run;

export default Component.extend(ClickOutside, DraggableElement, {
  classNames: ['gradient-stop'],
  color: '',
  gradientStop: null,
  isShowingColorPicker: false,

  _elementWidth: 0,
  _halfElementWidth: 0,
  _parentWidth: 0,

  init() {
    this._super(...arguments);

    // Initialize the gradient-stop's properties
    this.set('color', this.get('gradientStop.color'));
    scheduleOnce('afterRender', this, () => {
      this.$().css('left', `${this.get('gradientStop.left')}%`);
    });
  },

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

  actions: {
    /**
     * @param String color  Color value
     *
     * Update the gradient-stop's color value
     */
    colorChanged: function(color) {
      run(() => {
        this.set('gradientStop.color', color);
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
      let elementWidth = this.get('_elementWidth');
      let parentWidth = this.get('_parentWidth');
      let middle = event.clientX;
      let leftPercentage = (middle / parentWidth) * 100;
      let rightPercentage = ((middle + elementWidth) / parentWidth) * 100;
      if (leftPercentage < 0 || rightPercentage > 100) {
        return;
      }

      run(() => {
        this.$().css('left', `${leftPercentage}%`);
        this.set('gradientStop.left', leftPercentage);
      });
    },
  }
});
