/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 *
 * Source: http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 *
 * @param   Number r  The red color value
 * @param   Number g  The green color value
 * @param   Number b  The blue color value
 * @return  []Number  The HSL representation
 */
export function rgbToHsl(red, green, blue){
  let r, g, b;
  r = red / 255; 
  g = green / 255; 
  b = blue / 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max === min){
      h = s = 0; // achromatic
  } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }

  return [
    h * 360, 
    s * 100, 
    l * 100
  ];
}

function hue2rgb(p, q, t){
  if (t < 0) { 
    t += 1;
  }
  
  if (t > 1) { 
    t -= 1; 
  }
  
  if (t < 1/6) {
    return p + (q - p) * 6 * t ;
  }
  
  if (t < 1/2) {
    return q;
  }
  
  if (t < 2/3) {
    return p + (q - p) * (2/3 - t) * 6;
  }
  
  return p;
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 *
 * Source: http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 *
 * @param   Number hue        The hue
 * @param   Number saturation The saturation
 * @param   Number lightness  The lightness
 * @return  []Number          The RGB representation
 */
export function hslToRgb(hue, saturation, lightness){
  let h, s, l, r, g, b;
  
  h = hue / 360;
  s = saturation / 100;
  l = lightness / 100;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [
    Math.round(r * 255), 
    Math.round(g * 255), 
    Math.round(b * 255)
  ];
}

/**
 * @param Number sbSaturation  HSB saturation value
 * @param Number sbBrightness  HSB brightness value
 * @return []Number            HSL's saturation and lightness values
 *
 * Converts HSB's saturation and brightness to HSL's saturation and lightness
 */
export function hsbToHsl(sbSaturation, sbBrightness) {
  let lightness = (2 - sbSaturation) * sbBrightness / 2;
  let saturation = (lightness && lightness < 1) ?
    sbSaturation * sbBrightness / ((lightness < 0.5) ? lightness * 2 : 2 - lightness * 2) :
    sbSaturation;
  return [saturation, lightness];
}

/**
 * @param Number slSaturation  HSL saturation value
 * @param Number slBrightness  HSL brightness value
 * @return []Number            HSB's saturation and brightness values
 *
 * Converts HSL's saturation and lightness to HSB's saturation and brightness
 */
export function hslToHsb(slSaturation, slLightness) {
  let lightnessMod = slSaturation * (slLightness < 0.5 ? slLightness : 1 - slLightness);
  let brightness = slLightness + lightnessMod;
  let saturation = slLightness > 0 ? 2 * lightnessMod / brightness : slSaturation;
  return [saturation, brightness];
}

/**
 * @param Number a  Minimum point
 * @param Number b  Maximum point
 * @param Number f  Fraction
 * @return Number
 *
 * Calculates linear interpolation between two numbers
 */
export function lerp(a, b, f) {
  return ((a * -f) + (b * f));
}

/**
 * @param Number degrees  Degrees
 * @return Number radians
 *
 * Converts degrees to radians
 */
export function degsToRads(degrees) {
  return (degrees * (Math.PI/180));
}