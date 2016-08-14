import Ember from 'ember';
import { degsToRads } from 'color-storm/utils/color-converter';

const { Component, on } = Ember;

function position(radians, distance) {
  let result = {
    left: (distance * Math.cos(radians)) + 360,
    top: (distance * Math.sin(radians)) + 360
  };
  
  return result;
}

export default Component.extend({
  classNames: ['color-picker__wheel'],
  hue: 0,
  saturation: 0,

  setRingPos: on('didUpdateAttrs', function() {
    let h = this.get('hue');
    let s = this.get('saturation');
    let rads = degsToRads(h);
    let pos = position(rads, ((360) * (s/100)));
    this.$('.color-picker__locator-ring').css(pos);
  }),
});
