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
  /*
      var socket = this.get('socketService').socketFor('ws://localhost:8080/foo/bar');


      socket.on('open', () => {
        console.log('On open called'); // eslint-disable-line no-console
      }, this);

      socket.on('close', () => {
        console.log('On close called'); // eslint-disable-line no-console
      }, this);

      socket.on('message', (messageFromSocket) => {
        this.get('messages').pushObject({text: messageFromSocket.data});
      }, this);
    },

    actions: {
      submitText: function() {
        var socket = this.get('socketService').socketFor('ws://localhost:8080/foo/bar');
        socket.send(this.get('messageText'), true);
    }/*,
      mousedown: function(e) {
          e.preventDefault();
          console.log(e);
  		drawing = true;
          console.log("e.pagex, e.pagey", e.pageX+' '+e.pageY);
      }
      */

    }




});
