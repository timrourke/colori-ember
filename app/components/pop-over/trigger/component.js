import Ember from 'ember';

const { Component } = Ember;
const { next } = Ember.run;

export default Component.extend({
  classNames: ['pop-over__trigger'],
  tagName: 'span',

  click() {
    next(this, function() {
      this.sendAction('onClick');
    });    
  }
});
