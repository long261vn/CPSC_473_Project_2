import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['timestamp'],
  sortAscending: false, // sorts post by timestamp
  actions: {
    addMessage: function() {
      var newMessage = this.store.createRecord('message', {
        name: this.get('name'),
        body: this.get('body'),
        timestamp: new Date().getTime()
      });
      newMessage.save();

    }
  },

  messageText: null,
  messages: null,
  //tagName: 'canvas',

  socketService: Ember.inject.service('websockets'),

  init() {
    this._super(...arguments);
    this.messages = Ember.A();
  }
  
});
