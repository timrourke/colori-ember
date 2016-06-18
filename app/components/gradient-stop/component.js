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

    this.set('color', this.get('gradientStop.color'));

    scheduleOnce('afterRender', this, () => {
      this.$().css('left', `${this.get('gradientStop.left')}%`);
    });
  },

   _attachClickOutsideHandler: on('didInsertElement', function() {
    next(this, this.addClickOutsideListener);
  }),

  _removeClickOutsideHandler: on('willDestroyElement', function() {
    this.removeClickOutsideListener();
  }),

  clickOutside() {
    this.set('isShowingColorPicker', false);
  },

  colorObserver: observer('color', function() {
    this.set('gradientStop.color', this.get('color'));
  }),

  actions: {
    dragStart() {
      let width = this.$().width();
      this.set('_elementWidth', width);
      this.set('_halfElementWidth', width / 2);
      this.set('_parentWidth', this.$().parent().width());
    },

    dragDrag(e) {
      let elementWidth = this.get('_elementWidth');
      let parentWidth = this.get('_parentWidth');
      let middle = e.clientX;
      let leftPercentage = (middle / parentWidth) * 100;
      let rightPercentage = ((middle + elementWidth) / parentWidth) * 100;
      if (leftPercentage < 0 || rightPercentage > 100) {
        return;
      }
      Ember.run(() => {
        this.$().css('left', `${leftPercentage}%`);
        this.set('gradientStop.left', leftPercentage);
      });
    },

    dragEnd() {
      // Override in implementation
    },
  }
});
