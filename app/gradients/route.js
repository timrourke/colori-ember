import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({

  init() {
    this._super(...arguments);

    console.log('initing');

    this.store.pushPayload('gradient', {
      "data": {
        "type": 'gradients',
        "id": '1',
        "attributes": {
          "title": 'Test gradient',
          "description": 'This is a test gradient.',
          "inserted-at": new Date().getTime(),
          "updated-at": new Date().getTime()
        }
      }
    });

    this.store.pushPayload('gradient-layer', {
      "data": {
        "type": 'gradient-layers',
        "id": '1',
        "attributes": {
          "angle": 90,
          "order": 0,
          "gradient-type": 'linear',
        },
        "relationships": {
          "gradient": {
            "data": {
              "type": "gradient",
              "id": "1"  
            }
          }
        }
      }
    });

    this.store.pushPayload('gradient-stop', {
      "data": {
        "type": "gradient-stop",
        "id": "1",
        "attributes": {
          "left": "0",
          "color": "rgba(255,0,0,0.125)"
        },
        "relationships": {
          "gradient-layer": {
            "data": {
              "type": "gradient-layer",
              "id": "1"  
            }
          }
        }
      }
    });

    this.store.pushPayload('gradient-stop', {
      "data": {
        "type": "gradient-stop",
        "id": "2",
        "attributes": {
          "left": "100",
          "color": "rgba(0,0,0,0.5)"
        },
        "relationships": {
          "gradient-layer": {
            "data": {
              "type": "gradient-layer",
              "id": "1"  
            }
          }
        }
      }
    });

    this.store.pushPayload('gradient-layer', {
      "data": {
        "type": 'gradient-layers',
        "id": '2',
        "attributes": {
          "angle": 45,
          "order": 1,
          "gradient-type": 'linear',
        },
        "relationships": {
          "gradient": {
            "data": {
              "type": "gradient",
              "id": "1"  
            }
          }
        }
      }
    });

    this.store.pushPayload('gradient-stop', {
      "data": {
        "type": "gradient-stop",
        "id": "3",
        "attributes": {
          "left": "0",
          "color": "rgba(0,255,255,0.125)"
        },
        "relationships": {
          "gradient-layer": {
            "data": {
              "type": "gradient-layer",
              "id": "2"  
            }
          }
        }
      }
    });

    this.store.pushPayload('gradient-stop', {
      "data": {
        "type": "gradient-stop",
        "id": "4",
        "attributes": {
          "left": "100",
          "color": "rgba(0,255,0,0.25)"
        },
        "relationships": {
          "gradient-layer": {
            "data": {
              "type": "gradient-layer",
              "id": "2"  
            }
          }
        }
      }
    });
  },

  model() {
    return this.store.peekAll('gradient');
  },

  setupController(controller, model) {
    controller.set('gradients', model);
  }

});
