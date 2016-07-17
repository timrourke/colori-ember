import Ember from 'ember';
import { hslToRgb, rgbToHsl } from 'color-storm/services/color-converter';

const { Component, computed } = Ember;
const { htmlSafe } = Ember.String;

export default Component.extend({
  classNames: ['color-picker'],
  classNameBindings: ['isSmallSize:color-picker--1x:color-picker--2x'],
  
  alpha: 1,
  hue: 0,
  lightness: 0,
  saturation: 0,
  isSmallSize: true,

  /**
   * @property isSmallSize
   * @return Number
   *
   * The maximum height for the sliders
   */
  maxHeight: computed('isSmallSize', function() {
    if (this.get('isSmallSize')) {
      return 180;
    }
    return 360;
  }),

  /**
   * @property rgb.r
   * @sets hue
   * @sets saturation
   * @sets lightness
   * @return Number
   *
   * R component of RGB. Mutates upstream HSL values.
   */
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

  /**
   * @property rgb.g
   * @sets hue
   * @sets saturation
   * @sets lightness
   * @return Number
   *
   * G component of RGB. Mutates upstream HSL values.
   */
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

  /**
   * @property rgb.b
   * @sets hue
   * @sets saturation
   * @sets lightness
   * @return Number
   *
   * B component of RGB. Mutates upstream HSL values.
   */
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

  /**
   * @property hue
   * @property saturation
   * @property lightness
   * @return {}Number
   *
   * Object representing RGB values
   */
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

  /**
   * @property rgb.r
   * @property rgb.g
   * @property rgb.b
   * @sets r
   * @sets g
   * @sets b
   * @return String
   *
   * HEX representation of RGB values. Mutates upstream R, G, and B values.
   */
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
        
        // Update R, G, and B
        rgb.forEach((val, index) => {
          this.set(keys[index], val);
        });
      }
      
      return (value.indexOf('#') === 0) ?
        value :
        '#' + value;
    }
  }),

  /**
   * @property hue
   * @property isSmallSize
   *
   * Bottom position (px) for hue slider
   */
  hPos: computed('hue', 'isSmallSize', function() {
    if (this.get('isSmallSize')) {
      return this.get('hue') / 2;
    }
    return this.get('hue');
  }),
  
  /**
   * @property saturation
   * @property maxHeight
   * @return Number
   *
   * Bottom position (px) for saturation slider
   */
  sPos: computed('saturation', 'maxHeight', function() {
    let maxHeight = this.get('maxHeight');
    return (this.get('saturation') * maxHeight) / 100;
  }),
  
  /**
   * @property lightness
   * @property maxHeight
   * @return Number
   *
   * Bottom position (px) for lightness slider
   */
  lPos: computed('lightness', 'maxHeight', function() {
    let maxHeight = this.get('maxHeight');
    return (this.get('lightness') * maxHeight) / 100;
  }),
  
  /**
   * @property alpha
   * @property maxHeight
   * @return Number
   *
   * Bottom position (px) for alpha slider
   */
  aPos: computed('alpha', 'maxHeight', function() {
    let maxHeight = this.get('maxHeight');
    return this.get('alpha') * maxHeight;
  }),

  /**
   * @property r
   * @property maxHeight
   * @return Number
   *
   * Bottom position (px) for r slider
   */
  rPos: computed('r', 'maxHeight', function() {
    let maxHeight = this.get('maxHeight');
    return (this.get('r') / 255) * maxHeight;
  }),

  /**
   * @property g
   * @property maxHeight
   * @return Number
   *
   * Bottom position (px) for g slider
   */
  gPos: computed('g', 'maxHeight', function() {
    let maxHeight = this.get('maxHeight');
    return (this.get('g') / 255) * maxHeight;
  }),

  /**
   * @property b
   * @property maxHeight
   * @return Number
   *
   * Bottom position (px) for b slider
   */
  bPos: computed('b', function() {
    let maxHeight = this.get('maxHeight');
    return (this.get('b') / 255) * maxHeight;
  }),

  /**
   * @property hue
   * @return String
   * 
   * CSS style rule for color locator background
   */
  locatorBackground: computed('hue', function() {
    let bg = `hsl(${this.get('hue')},100%,50%)`;
    let style = htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  /**
   * @property rgb.r
   * @property rgb.g
   * @property rgb.b
   * @return String
   * 
   * CSS style rule for RGB background
   */
  rgbBackground: computed('rgb.r', 'rgb.g', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(${rgb.get('r')},${rgb.get('g')},${rgb.get('b')})`;
    let style = htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  /**
   * @property rgb.r
   * @property rgb.g
   * @property rgb.b
   * @property alpha
   * @return String
   * 
   * CSS style rule for RGBA background
   */
  rgbaBackground: computed('rgb.r', 'rgb.g', 'rgb.b', 'alpha', function() {
    let rgb = this.get('rgb');
    let a = this.get('alpha');
    let bg = `rgba(${rgb.get('r')},${rgb.get('g')},${rgb.get('b')},${a})`;
    let style = htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  /**
   * @property hue
   * @property saturation
   * @property lightness
   * @return String
   * 
   * CSS style rule for HSL background
   */
  hslBackground: computed('hue', 'saturation', 'lightness', function() {
    let h = this.get('hue');
    let s = this.get('saturation');
    let l = this.get('lightness');
    let bg = `hsl(${h},${s}%,${l}%)`;
    let style = htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  /**
   * @property hue
   * @property saturation
   * @property lightness
   * @property alpha
   * @return String
   * 
   * CSS style rule for HSLA background
   */
  hslaBackground: computed('hue', 'saturation', 'lightness', 'alpha', function() {
    let h = this.get('hue');
    let s = this.get('saturation');
    let l = this.get('lightness');
    let a = this.get('alpha');
    let bg = `hsla(${h},${s}%,${l}%,${a})`;
    let style = htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  /**
   * @property hue
   * @property saturation
   * @return String
   * 
   * CSS style rule for top of HSL lightness slider's background
   */
  lightnessBefore: computed('hue', 'saturation', function() {
    let h = this.get('hue');
    let s = this.get('saturation');
    let bg = `hsl(${h},${s}%,100%)`;
    let style = htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  /**
   * @property hue
   * @property saturation
   * @return String
   * 
   * CSS style rule for HSL lightness slider's gradient background
   */
  lightnessBackground: computed('hue', 'saturation', function() {
    let h = this.get('hue');
    let s = this.get('saturation');
    let bg = `hsl(${h},${s}%,100%), hsl(${h},${s}%,0%)`;
    let style = htmlSafe(`background: linear-gradient(to bottom, ${bg});`);
    return style;
  }),

  /**
   * @property hue
   * @property saturation
   * @return String
   * 
   * CSS style rule for bottom of HSL lightness slider's background
   */
  lightnessAfter: computed('hue', 'saturation', function() {
    let h = this.get('hue');
    let s = this.get('saturation');
    let bg = `hsl(${h},${s}%,0%)`;
    let style = htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  /**
   * @property hue
   * @property lightness
   * @return String
   * 
   * CSS style rule for top of HSL saturation slider's background
   */
  saturationsBefore: computed('hue', 'lightness', function() {
    let h = this.get('hue');
    let l = this.get('lightness');
    let bg = `hsl(${h},100%,${l}%)`;
    let style = htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  /**
   * @property hue
   * @property lightness
   * @return String
   * 
   * CSS style rule for HSL saturation slider's gradient background
   */
  saturationsBackground: computed('hue', 'lightness', function() {
    let h = this.get('hue');
    let l = this.get('lightness');
    let bg = `hsl(${h},100%,${l}%), hsl(${h},0%,${l}%)`;
    let style = htmlSafe(`background: linear-gradient(to bottom, ${bg});`);
    return style;
  }),

  /**
   * @property hue
   * @property lightness
   * @return String
   * 
   * CSS style rule for bottom of HSL saturation slider's background
   */
  saturationsAfter: computed('hue', 'lightness', function() {
    let h = this.get('hue');
    let l = this.get('lightness');
    let bg = `hsl(${h},0%,${l}%)`;
    let style = htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  /**
   * @property rgb.g
   * @property rgb.b
   * @return String
   *
   * CSS style rule for top of R slider's background
   */
  redsBefore: computed('rgb.g', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(255,${rgb.get('g')},${rgb.get('b')})`;
    let style = htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  /**
   * @property rgb.g
   * @property rgb.b
   * @return String
   *
   * CSS style rule for R slider's gradient background
   */
  redsBackground: computed('rgb.g', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(255,${rgb.get('g')},${rgb.get('b')}), rgb(0,${rgb.get('g')},${rgb.get('b')})`;
    let style = htmlSafe(`background: linear-gradient(to bottom, ${bg});`);
    return style;
  }),

  /**
   * @property rgb.g
   * @property rgb.b
   * @return String
   *
   * CSS style rule for bottom of R slider's background
   */
  redsAfter: computed('rgb.g', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(0,${rgb.get('g')},${rgb.get('b')})`;
    let style = htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  /**
   * @property rgb.r
   * @property rgb.b
   * @return String
   *
   * CSS style rule for top of G slider's background
   */
  greensBefore: computed('rgb.r', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(${rgb.get('r')},255,${rgb.get('b')})`;
    let style = htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  /**
   * @property rgb.r
   * @property rgb.b
   * @return String
   *
   * CSS style rule for G slider's gradient background
   */
  greensBackground: computed('rgb.r', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(${rgb.get('r')},255,${rgb.get('b')}), rgb(${rgb.get('r')},0,${rgb.get('b')})`;
    let style = htmlSafe(`background: linear-gradient(to bottom, ${bg});`);
    return style;
  }),

  /**
   * @property rgb.r
   * @property rgb.b
   * @return String
   *
   * CSS style rule for bottom of G slider's background
   */
  greensAfter: computed('rgb.r', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(${rgb.get('r')},0,${rgb.get('b')})`;
    let style = htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  /**
   * @property rgb.r
   * @property rgb.g
   * @return String
   *
   * CSS style rule for top of B slider's background
   */
  bluesBefore: computed('rgb.r', 'rgb.g', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(${rgb.get('r')},${rgb.get('g')},255)`;
    let style = htmlSafe(`background-color: ${bg};`);
    return style;
  }),

  /**
   * @property rgb.r
   * @property rgb.g
   * @return String
   *
   * CSS style rule for B slider's gradient background
   */
  bluesBackground: computed('rgb.r', 'rgb.g', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(${rgb.get('r')},${rgb.get('g')},255), rgb(${rgb.get('r')},${rgb.get('g')},0)`;
    let style = htmlSafe(`background: linear-gradient(to bottom, ${bg});`);
    return style;
  }),

  /**
   * @property rgb.r
   * @property rgb.g
   * @return String
   *
   * CSS style rule for bottom of B slider's background
   */
  bluesAfter: computed('rgb.r', 'rgb.g', function() {
    let rgb = this.get('rgb');
    let bg = `rgb(${rgb.get('r')},${rgb.get('g')},0)`;
    let style = htmlSafe(`background: ${bg};`);
    return style;
  }),

  /**
   * @property rgb.r
   * @property rgb.g
   * @property rgb.b
   * @return String
   *
   * CSS style rule for top of alpha slider's background
   */
  alphaBefore: computed('rgb.r', 'rgb.g', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgba(${rgb.get('r')},${rgb.get('g')},${rgb.get('b')},1)`;
    let style = htmlSafe(`background: ${bg};`);
    return style;
  }),

  /**
   * @property rgb.r
   * @property rgb.g
   * @property rgb.b
   * @return String
   *
   * CSS style rule for alpha slider's gradient background
   */
  alphaBackground: computed('rgb.r', 'rgb.g', 'rgb.b', function() {
    let rgb = this.get('rgb');
    let bg = `rgba(${rgb.get('r')},${rgb.get('g')},${rgb.get('b')},1), rgba(${rgb.get('r')},${rgb.get('g')},${rgb.get('b')},0)`;
    let style = htmlSafe(`background: linear-gradient(to bottom, ${bg});`);
    return style;
  }),

  actions: {
    /**
     * @param Number position   Position coordinates to move to
     *
     * Updates saturation and lightness using top/left pixel coordinates
     */
    onChangeLocator(position) { console.log(position);
      let maxHeight = this.get('maxHeight');
      let newSaturation = (position.left / maxHeight) * 100;
      let newLightness = ((maxHeight - position.top) / maxHeight) * 100;
      this.set('saturation', newSaturation.toFixed(2));
      this.set('lightness', newLightness.toFixed(2));
    },

    /**
     * Toggle small size mode
     */
    toggleSize: function() {
      this.toggleProperty('isSmallSize');
    },

    /**
     * @param Number H  Number to set hue to
     *
     * Update hue value
     */
    updateH(H) {
      let hue = (this.get('isSmallSize')) ?
        H * 2 :
        H;
      this.set('hue', Math.round(hue));
    },

    /**
     * @param Number S  Number to set saturation to
     *
     * Update saturation value
     */
    updateS(S) {
      let maxHeight = this.get('maxHeight');
      let newSaturation = (S / maxHeight) * 100;
      this.set('saturation', newSaturation.toFixed(2));
    },

    /**
     * @param Number L  Number to set lightness to
     *
     * Update lightness value
     */
    updateL(L) {
      let maxHeight = this.get('maxHeight');
      let newLightness = (L / maxHeight) * 100;
      this.set('lightness', newLightness.toFixed(2));
    },

    /**
     * @param Number A  Number to set alpha to
     *
     * Update alpha value
     */
    updateA(A) {
      let maxHeight = this.get('maxHeight');
      let newAlpha = (A / maxHeight);
      this.set('alpha', newAlpha.toFixed(2));
    },

    /**
     * @param Number R  Number to set red to
     *
     * Update R value
     */    
    updateR(R) {
      let maxHeight = this.get('maxHeight');
      this.set('r', Math.round((R / maxHeight) * 255));
    },

    /**
     * @param Number G  Number to set green to
     *
     * Update G value
     */
    updateG(G) {
      let maxHeight = this.get('maxHeight');
      this.set('g', Math.round((G / maxHeight) * 255));
    },

    /**
     * @param Number B  Number to set blue to
     *
     * Update B value
     */
    updateB(B) {
      let maxHeight = this.get('maxHeight');
      this.set('b', Math.round((B / maxHeight) * 255));
    },
  }
});
