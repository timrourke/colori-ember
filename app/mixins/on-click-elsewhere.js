import Ember from 'ember';
import ClickOutside from 'ember-click-outside/mixins/click-outside';

const { K, Mixin, on } = Ember;
const { next } = Ember.run;

export default Mixin.create(ClickOutside, {
  clickOutside() {
		if (this.isDestroyed) {
			return false;
		}

    this.onClickElsewhere();
  },

  onClickElsewhere: K,

  _attachClickOutsideHandler: on('didInsertElement', function() {
    next(this, this.addClickOutsideListener);
  }),
 
  _removeClickOutsideHandler: on('willDestroyElement', function() {
    this.removeClickOutsideListener();
  })
});
