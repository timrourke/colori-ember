import Ember from 'ember';
import { hslToRgb, rgbToHsl } from 'color-storm/services/color-converter';

const { Component, computed } = Ember;
const { alias } = computed;

export default Component.extend({
  classNames: ['color-picker'],
  
  alpha: 1,
  hue: 0,
  saturation: 0,
  lightness: 0,

  r: computed('rgb.r', {
    get() {
      return this.get('rgb.r');
    },
    set(key, value) {
      let [h, s, l] = rgbToHsl(value, this.get('g'), this.get('b'));
      this.set('hue', Math.round(h));
      this.set('saturation', s.toFixed(2));
      this.set('lightness', l.toFixed(2));
      return value;
    }
  }),

  g: computed('rgb.g', {
    get() {
      return this.get('rgb.g');
    },
    set(key, value) {
      let [h, s, l] = rgbToHsl(this.get('r'), value, this.get('b'));
      this.set('hue', Math.round(h));
      this.set('saturation', s.toFixed(2));
      this.set('lightness', l.toFixed(2));
      return value;
    }
  }),

  b: computed('rgb.b', {
    get() {
      return this.get('rgb.b');
    },
    set(key, value) {
      let [h, s, l] = rgbToHsl(this.get('r'), this.get('g'), value);
      this.set('hue', Math.round(h));
      this.set('saturation', s.toFixed(2));
      this.set('lightness', l.toFixed(2));
      return value;
    }
  }),

  hex: computed('rgb.r', 'rgb.g', 'rgb.b', {
    get() {
      let {r, g, b} = this.get('rgb');
      let hexString = '#';
      [r,g,b].map(val => {
        hexString += (val < 16) ?
          `0${val.toString(16)}` :
          val.toString(16);
      });
      return hexString;
    },
    set(key, value) {
      let input = (value||"").trim();
      let matches = input.match(/^#?([\da-fA-F]{3})([\da-fA-F]{3})?$/);
      let rgb = [];
      let keys = ['r','g','b'];

      if (matches && matches.length > 2) {
        switch (typeof matches[2]) {
          // 3-character HEX abbreviation
          case 'undefined':
            matches[1].split('').forEach(val => {
              rgb.push(parseInt(val+val, 16));
            });
          break;
          // 6-character HEX
          case 'string':
            (`${matches[1]}${matches[2]}`).match(/.{1,2}/g).forEach(val => {
              rgb.push(parseInt(val, 16));
            });
          break;
        }
        
        rgb.forEach((val, index) => {
          this.set(keys[index], val);
        });
      }
      
      return (value.indexOf('#') === 0) ?
        value :
        '#' + value;
    }
  }),

  hPos: alias('hue'),
  
  sPos: computed('saturation', function() {
    return (this.get('saturation') * 360) / 100;
  }),
  
  lPos: computed('lightness', function() {
    return (this.get('lightness') * 360) / 100;
  }),
  
  aPos: computed('alpha', function() {
    return this.get('alpha') * 360;
  }),

  rPos: computed('r', function() {
    return (this.get('r') / 255) * 360;
  }),

  gPos: computed('g', function() {
    return (this.get('g') / 255) * 360;
  }),

  bPos: computed('b', function() {
    return (this.get('b') / 255) * 360;
  }),

  rgb: computed('hue', 'saturation', 'lightness', function() {
    let h = this.get('hue');
    let s = this.get('saturation');
    let l = this.get('lightness');
    let [r,g,b] = hslToRgb(h,s,l);
    return Ember.Object.create({
      r: r,
      g: g,
      b: b
    });
  }),

  locatorBackground: computed('hue', function() {
    let bg = `hsl(${this.get('hue')},100%,50%)`;
    let style = Ember.String.htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  rgbBackground: computed('rgb.r', 'rgb.g', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(${rgb.get('r')},${rgb.get('g')},${rgb.get('b')})`;
    let style = Ember.String.htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  rgbaBackground: computed('rgb.r', 'rgb.g', 'rgb.b', 'alpha', function() {
    let rgb = this.get('rgb');
    let a = this.get('alpha');
    let bg = `rgba(${rgb.get('r')},${rgb.get('g')},${rgb.get('b')},${a})`;
    let style = Ember.String.htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  hslBackground: computed('hue', 'saturation', 'lightness', function() {
    let h = this.get('hue');
    let s = this.get('saturation');
    let l = this.get('lightness');
    let bg = `hsl(${h},${s}%,${l}%)`;
    let style = Ember.String.htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  hslaBackground: computed('hue', 'saturation', 'lightness', 'alpha', function() {
    let h = this.get('hue');
    let s = this.get('saturation');
    let l = this.get('lightness');
    let a = this.get('alpha');
    let bg = `hsla(${h},${s}%,${l}%,${a})`;
    let style = Ember.String.htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  lightnessBackground: computed('hue', 'saturation', function() {
    let h = this.get('hue');
    let s = this.get('saturation');
    let bg = `hsl(${h},${s}%,100%), hsl(${h},${s}%,0%)`;
    let style = Ember.String.htmlSafe(`background: linear-gradient(to bottom, ${bg});`);
    return style;
  }),

  lightnessBefore: computed('hue', 'saturation', function() {
    let h = this.get('hue');
    let s = this.get('saturation');
    let bg = `hsl(${h},${s}%,100%)`;
    let style = Ember.String.htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  lightnessAfter: computed('hue', 'saturation', function() {
    let h = this.get('hue');
    let s = this.get('saturation');
    let bg = `hsl(${h},${s}%,0%)`;
    let style = Ember.String.htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  saturationsAfter: computed('hue', 'lightness', function() {
    let h = this.get('hue');
    let l = this.get('lightness');
    let bg = `hsl(${h},0%,${l}%)`;
    let style = Ember.String.htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  saturationsBackground: computed('hue', 'lightness', function() {
    let h = this.get('hue');
    let l = this.get('lightness');
    let bg = `hsl(${h},100%,${l}%), hsl(${h},0%,${l}%)`;
    let style = Ember.String.htmlSafe(`background: linear-gradient(to bottom, ${bg});`);
    return style;
  }),

  saturationsBefore: computed('hue', 'lightness', function() {
    let h = this.get('hue');
    let l = this.get('lightness');
    let bg = `hsl(${h},100%,${l}%)`;
    let style = Ember.String.htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  redsBackground: computed('rgb.g', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(255,${rgb.get('g')},${rgb.get('b')}), rgb(0,${rgb.get('g')},${rgb.get('b')})`;
    let style = Ember.String.htmlSafe(`background: linear-gradient(to bottom, ${bg});`);
    return style;
  }),

  redsBefore: computed('rgb.g', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(255,${rgb.get('g')},${rgb.get('b')})`;
    let style = Ember.String.htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  redsAfter: computed('rgb.g', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(0,${rgb.get('g')},${rgb.get('b')})`;
    let style = Ember.String.htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  greensBackground: computed('rgb.r', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(${rgb.get('r')},255,${rgb.get('b')}), rgb(${rgb.get('r')},0,${rgb.get('b')})`;
    let style = Ember.String.htmlSafe(`background: linear-gradient(to bottom, ${bg});`);
    return style;
  }),

  greensBefore: computed('rgb.r', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(${rgb.get('r')},255,${rgb.get('b')})`;
    let style = Ember.String.htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  greensAfter: computed('rgb.r', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(${rgb.get('r')},0,${rgb.get('b')})`;
    let style = Ember.String.htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  bluesBackground: computed('rgb.r', 'rgb.g', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(${rgb.get('r')},${rgb.get('g')},255), rgb(${rgb.get('r')},${rgb.get('g')},0)`;
    let style = Ember.String.htmlSafe(`background: linear-gradient(to bottom, ${bg});`);
    return style;
  }),

  bluesBefore: computed('rgb.r', 'rgb.g', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(${rgb.get('r')},${rgb.get('g')},255)`;
    let style = Ember.String.htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  bluesAfter: computed('rgb.r', 'rgb.g', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(${rgb.get('r')},${rgb.get('g')},0)`;
    let style = Ember.String.htmlSafe(`background: ${bg};`);
    return style;
  }),

  alphaBackground: computed('rgb.r', 'rgb.g', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgba(${rgb.get('r')},${rgb.get('g')},${rgb.get('b')},1), rgba(${rgb.get('r')},${rgb.get('g')},${rgb.get('b')},0)`;
    let style = Ember.String.htmlSafe(`background: linear-gradient(to bottom, ${bg});`);
    return style;
  }),

  alphaBefore: computed('rgb.r', 'rgb.g', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgba(${rgb.get('r')},${rgb.get('g')},${rgb.get('b')},1)`;
    let style = Ember.String.htmlSafe(`background: ${bg};`);
    return style;
  }),

  actions: {
    onChangeLocator(position) {
      let newSaturation = (position.left / 360) * 100;
      let newLightness = ((360 - position.top) / 360) * 100;
      this.set('saturation', newSaturation.toFixed(2));
      this.set('lightness', newLightness.toFixed(2));
    },

    updateH(H) {
      this.set('hue', Math.round(H));
    },

    updateS(S) {
      let newSaturation = (S / 360) * 100;
      this.set('saturation', newSaturation.toFixed(2));
    },

    updateL(L) {
      let newLightness = (L / 360) * 100;
      this.set('lightness', newLightness.toFixed(2));
    },

    updateA(A) {
      let newAlpha = (A / 360);
      this.set('alpha', newAlpha.toFixed(2));
    },

    updateR(R) {
      this.set('r', ((R / 360) * 255).toFixed(2));
    },

    updateG(G) {
      this.set('g', ((G / 360) * 255).toFixed(2));
    },

    updateB(B) {
      this.set('b', ((B / 360) * 255).toFixed(2));
    },
  }
});
