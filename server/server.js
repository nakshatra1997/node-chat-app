const path=require('path');
const http=require('http');

const publicPath=path.join(__dirname,'../public');

const socketIO=require('socket.io');
const express=require('express');
const port=process.env.PORT||3000;
var app= express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));
io.on('connection',(socket)=>{
	console.log('new user connected');

	socket.emit('newMessage',{
		//object to send custom data
		from:'admin',
		text:'welcome to the chat app',
		createdAt: new Date().getTime()
	});
    socket.broadcast.emit('newMessage',{
    	from:'admin',
		text:'new user joined',
		createdAt: new Date().getTime()
    });

	socket.on('createEmail',(newEmail)=>{
      console.log('create a mail',newEmail);
	});

	socket.on('createMessage',(message)=>{
      console.log('message to be created is',message);
	  //io.emit will be used for every single user which is connected to network
	  io.emit('newMessage',{
	  	from:message.from,
	  	text:message.text,
	  	createdAt:new Date().getTime()
	  });
	  // socket.broadcast.emit('newMessage',{
	  // 	from:message.from,
	  // 	text:message.text,
	  // 	createdAt:new Date().getTime()
	  // });
	});
	
	socket.on('disconnect',()=>{
		console.log('user was disconnected from server');
	});
});


//now since we are listening to the http server we must remove the app server
server.listen(port,()=>{
	console.log(`server is running on ${port}`);
});