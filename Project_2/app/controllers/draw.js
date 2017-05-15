import Ember from 'ember';

export default Ember.Controller.extend({
  messageText: null,
  messages: null,
  //tagName: 'canvas',

  socketService: Ember.inject.service('websockets'),

  init() {
    this._super(...arguments);
    this.messages = Ember.A();
  }

});
