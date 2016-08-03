import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['pop-over'],
  showContent: false,

  actions: {
    onClick() {
      this.toggleProperty('showContent');
    }
  }
});
