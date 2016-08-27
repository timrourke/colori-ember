import {
  fillable
} from 'color-storm/tests/page-object';

export default {
  scope: '.color-picker',
  inputs: {
    scope: '.color-picker__inputs',
    inputsRgb: {
      scope: '.color-picker__inputsRgb',
      inputR:     fillable('#color-picker__input-R'),
      inputG:     fillable('#color-picker__input-G'),
      inputB:     fillable('#color-picker__input-B'),
      inputA1:    fillable('#color-picker__input-A1'),  
    },
    inputsHsl: {
      scope: '.color-picker__inputsHsl',
      inputH:     fillable('#color-picker__input-H'),
      inputS:     fillable('#color-picker__input-S'),
      inputL:     fillable('#color-picker__input-L'),
      inputA2:    fillable('#color-picker__input-A2'),
    },
    inputsHsb: {
      scope: '.color-picker__inputsHsb',
      inputH2:    fillable('#color-picker__input-H2'),
      inputHSBS:  fillable('#color-picker__input-HSBS'),
      inputHSBB:  fillable('#color-picker__input-HSBB'),
      inputA3:    fillable('#color-picker__input-A3'),
    },
    inputHex:   fillable('#color-picker__input-HEX')
  }
};