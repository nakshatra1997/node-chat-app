	var socket=io();

	socket.on('connect',function (){
		console.log("connected to server");
		// socket.emit('createEmail',{
		// 	to:'hee@gmil.com',
		// 	text:'hello'
		// });
	
	});
	socket.on('newMessage',function (message){
		console.log('your message is',message);
		var li=$('<li></li>');
	    li.text(`${message.from}:${message.text}`);
	    $("#messages").append(li);
	});
	socket.on('disconnect',function (){
		console.log('disconnected from server');
	});
	//now we are listening to custom event
	// socket.on('newEmail',function (email)
	// 	{
	// 		console.log('new email',email);
	// 	});
	//now emit the above event in server.js with the help of socket
//now we are working to get the acknowledgement
// socket.emit('createMessage',{
// 	from:"nakshatra",
// 	text:"i want to get the acknowledgement"
// },function(data)
// {
// 	console.log("got it",data);
// });
// socket.on('test',function(message){
// 	console.log('server is emitting this info',message);
// });

$("#message-form").on('submit',function(e){
   e.preventDefault();   
   socket.emit('createMessage',{
   	from:'user',
   	text:$('[name=message]').val()
   },function()
   	{

   	});
});

