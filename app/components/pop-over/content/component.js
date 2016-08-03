import Ember from 'ember';
import OnClickElsewhere from 'color-storm/mixins/on-click-elsewhere';

const { Component } = Ember;

export default Component.extend(OnClickElsewhere, {
  classNames: ['pop-over__content'],
  showContent: false,

  onClickElsewhere() {
    this.set('showContent', false);
  }
});
