import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  attributeBindings: ['role', 'viewBox'],
  classNames: ['svg-icon'],
  name: '',
  role: 'img',
  tagName: 'svg',
  viewBox: '0 0 8 8'
});
