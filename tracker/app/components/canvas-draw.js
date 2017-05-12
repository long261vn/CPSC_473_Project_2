import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'canvas',
    width: 500,
    height: 500,
    attributeBindings: ['width','height'],
    socketService: Ember.inject.service('websockets'),
    socketIOService: Ember.inject.service('socket-io'),
    namespace: 'myCustomNamespace',
    prev: {},
    didInsertElement: function() {
        // gotta set ctxf here instead of in init because
        // the element might not be in the dom yet in init
        //var doc = $(document);
        this.set('doc', Ember.$(document));
        this.set('canvas', this.get('element'));
        this.set('ctx', this.get('element').getContext('2d'));

        this.set('ctx.lineWidth', 2);
        this.set('ctx.strokeStyle', '#FF0000');

        //this.prev = Ember.A();

        // Generate an unique ID
        var id = Math.round($.now()*Math.random());

        // A flag for drawing activity
        this.set('drawing',false);

        var clients = {};
        var cursors = {};
        //var socket = this.get('socketService').socketFor('ws://localhost:8080/foo/bar');
        //console.log(socket.emit);
        const socket = this.get('socketIOService').socketFor('http://localhost:7100/');//+ this.get('namespace')
        //console.log(socket);
        socket.on('moving', function(data) {
            console.log('draw');
            if(! (data.id in clients)){
    			// a new user has come online. create a cursor for them
    			cursors[data.id] = $('<div class="cursor">').appendTo('#cursors');
    		}

    		// Move the mouse pointer
    		cursors[data.id].css({
    			'left' : data.x,
    			'top' : data.y
    		});

    		// Is the user drawing?
    		if(data.drawing && clients[data.id]){

    			// Draw a line on the canvas. clients[data.id] holds
    			// the previous position of this user's mouse pointer

    			drawLine(clients[data.id].x, clients[data.id].y, data.x, data.y);
    		}

    		// Saving the current client state
    		clients[data.id] = data;
    		clients[data.id].updated = $.now();
        });



        let canvas = this;
        Ember.$(document).bind('mouseup mouseleave', function(){
            canvas.set('drawing',false);
            console.log('drawing', canvas.get('drawing'));
        });

        var lastEmit = $.now();
        console.log('lastEmit', lastEmit);



        Ember.$(document).on('mousemove', function(e){ //mouseover
            //socket.send('hello');
            if($.now() - lastEmit > 30){
                console.log('socket connected', socket.socket.connected);
                //socket.send({'x':10});
                socket.emit('mousemove',{
    				'x': e.pageX,
    				'y': e.pageY,
    				'drawing': canvas.get('drawing'),
    				'id': id
    			});
    			lastEmit = $.now();
    		}

    		// Draw a line for the current user's movement, as it is
    		// not received in the socket.on('moving') event above

    		if(canvas.get('drawing')){

    			drawLine(canvas.prev.x, canvas.prev.y, e.pageX, e.pageY);

    			canvas.prev.x = e.pageX;
    			canvas.prev.y = e.pageY;
    		}
        });


        // Remove inactive clients after 10 seconds of inactivity
        /*
    	setInterval(function(){
    		for(ident in clients){
    			if($.now() - clients[ident].updated > 10000){

    				// Last update was more than 10 seconds ago.
    				// This user has probably closed the page

    				cursors[ident].remove();
    				delete clients[ident];
    				delete cursors[ident];
    			}
    		}

    	},10000);
        */


        function drawLine(fromx, fromy, tox, toy){
            var ctx = canvas.get('ctx');
    		ctx.moveTo(fromx, fromy);
    		ctx.lineTo(tox, toy);
    		ctx.stroke();
    	}


    },
    mouseDown:function(e){
        e.preventDefault();
        this.set('drawing',true);
        this.prev.x=e.pageX;
        this.prev.y=e.pageY;
    }



});
