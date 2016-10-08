import Ember from 'ember';

const { Component } = Ember;
const { later } = Ember.run;

export default Component.extend({
  classNames: ['gradient-info'],
  classNameBindings: [
    'animating:gradient-info--animating',
    'open:gradient-info--open:gradient-info--closed'
  ],
  gradient: null,
  open: true,
  isShowingIcon: false,

  click() {
    this.handleClick();
  },

  didInsertElement() {
    this._super(...arguments);

    later(this, function() {
      this.closeSelf();
    }, 3000);
  },

  handleClick() {
    if (this.get('open')) {
      this.closeSelf();
    } else {
      this.openSelf();
    }
  },

  closeSelf() {
    this.set('animating', true);

    this.$('.gradient-info__title, .gradient-info__description').velocity({
      colorAlpha: 0
    }, {
      complete: () => {
        if (this.isDestroyed) {
          return;
        }

        this.set('open', false);

        this.$().velocity({
          width: '40px',
          height: '40px',
          borderRadius: '20px'
        }, {
          complete: () => {
            this.set('isShowingIcon', true);
            this.set('animating', false);
          }
        });
      }
    });
  },

  openSelf() {
    this.set('animating', true);
    this.set('isShowingIcon', false);
    
    this.$().velocity({  
      width: '320px',
      height: '100%',
      borderRadius: 0
    },{
      complete: () => {
        if (this.isDestroyed) {
          return;
        }

        this.set('open', true);
        this.set('animating', true);

        this.$('.gradient-info__title, .gradient-info__description').velocity({
          colorAlpha: 1
        });
      }
    }); 
  }
});
