import Ember from 'ember';
import DraggableElement from 'color-storm/mixins/draggable-element';

const { Component, on, run } = Ember;
const { scheduleOnce } = run;

export default Component.extend(DraggableElement, {
  classNames: ['color-picker__locator'],
  lightness: 0,
  saturation: 0,

  init() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, function() {
      this.updatePosition();
    });
  },

  click(e) {
    this.setPosition(e);
  },

  setPosition: function(e) {
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
    if (position.top > 360) {
      position.top = 360;
    }
    if (position.left > 360) {
      position.left = 360;
    }
    this.$('.color-picker__locator-ring').css(position);
    this.sendAction('onChange', position);
  },

  updatePosition: on('didUpdateAttrs', function() {
    let newPos = {
      top: -(this.get('lightness') - 360),
      left: this.get('saturation')
    };
    this.$('.color-picker__locator-ring').css(newPos);
  }),

  actions: {
    dragDrag(e) {
      this.setPosition(e);
    },
  }
});
