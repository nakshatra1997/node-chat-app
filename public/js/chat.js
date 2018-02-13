	var socket=io();

function scrollToBottom(){
    //selectors
    var messages=$('#messages');
    var newMessage=messages.children('li:last-child');
    //heights
    var clientHeight=messages.prop('clientHeight');
    var scrollTop=messages.prop('scrollTop');
    var scrollHeight=messages.prop('scrollHeight');
    var newMessageHeight=newMessage.innerHeight();
    var lastMessageHeight=newMessage.prev().innerHeight();
    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight)
    {
    	messages.scrollTop(scrollHeight);
    }
}
	socket.on('connect',function (){
		console.log("connected to server");
		// socket.emit('createEmail',{
		// 	to:'hee@gmil.com',
		// 	text:'hello'
		// });
	
	});
	socket.on('newMessage',function (message){
		var formattedTime=moment(message.createdAt).format('h:mm a');
		var template=$('#message-template').html();
		var html=Mustache.render(template,{
			text:message.text,
			from:message.from,
			createdAt:formattedTime
		});
		$('#messages').append(html);
		scrollToBottom();
		// console.log('your message is',message);
		// var formattedTime=moment(message.createdAt).format('h:mm a');
		// var li=$('<li></li>');
	 //    li.text(`${message.from} ${formattedTime}:${message.text}`);
	 //    $("#messages").append(li);
	});

	socket.on('newLocationMessage',function(message){
		// console.log(message);
		var formattedTime=moment(message.createdAt).format('h:mm a');
		var template=$('#location-message-template').html();
	
		
		var html=Mustache.render(template,{
			url:message.url,
			from:message.from,
			createdAt:formattedTime
		});
		$('#messages').append(html);
		scrollToBottom();
     //    var li=$('<li></li>');
     //    var a=$('<a target="_blank">my current location</a>');
	    // li.text(`${message.from} ${formattedTime}:`);
	    // a.attr('href',message.url);
	    // li.append(a);
	    // $('#messages').append(li);
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
   var messageTextBox=$('[name=message]');
   socket.emit('createMessage',{
   	from:'user',
   	text:messageTextBox.val()
   },function()
   	{
      messageTextBox.val('');
   	});
});

//for geolocation
var locationButton=$("#send-location");
locationButton.on('click',function()
	{
		
		if(!navigator.geolocation)
		{
			return alert('geolocation not supported by browser');
		}
         locationButton.attr('disabled','disabled').text('sending location..');
		navigator.geolocation.getCurrentPosition(function(position){
			locationButton.removeAttr('disabled').text('send location');
			socket.emit('createLocationMessage',{
				latitude:position.coords.latitude,
				longitude:position.coords.longitude
			});
		},function(){
            locationButton.removeAttr('disabled').text('send location');
			alert('unable to fetch location');})
	});