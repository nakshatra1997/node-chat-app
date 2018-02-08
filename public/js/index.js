	var socket=io();

	socket.on('connect',function (){
		console.log("connected to server");
		socket.emit('createEmail',{
			to:'hee@gmil.com',
			text:'hello'
		});
	
	});
	socket.on('newMessage',function (message){
		console.log('your message is',message);
	});
	socket.on('disconnect',function (){
		console.log('disconnected from server');
	});

	//now we are listening to custom event
	socket.on('newEmail',function (email)
		{
			console.log('new email',email);
		});
	//now emit the above event in server.js with the help of socket
