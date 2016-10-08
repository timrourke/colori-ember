import Ember from 'ember';

const { Component } = Ember;
const { later } = Ember.run;

export default Component.extend({
  classNames: ['gradient-info'],
  gradient: null,
  open: true,

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
    var self = this;
    
    self.$('.gradient-info__title, .gradient-info__description').velocity({
      colorAlpha: 0
    }, {
      complete: () => {
        if (self.isDestroyed) {
          return;
        }

        this.set('open', false);

        self.$().velocity({
          width: '50px',
          height: '50px',
          borderRadius: '25px'
        });
      }
    });
  },

  openSelf() {
    var self = this;
    
    self.$().velocity({  
      width: '320px',
      height: '100%',
      borderRadius: 0
    },{
      complete: () => {
        if (self.isDestroyed) {
          return;
        }

        this.set('open', true);

        self.$('.gradient-info__title, .gradient-info__description').velocity({
          colorAlpha: 1
        });
      }
    }); 
  }
});
