const path=require('path');
const http=require('http');

const {generateMessage,generateLocationMessage}=require('./utils/message');
const {isRealString}=require('./utils/validation');
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
    socket.on('join',(params,callback)=>{
       if(!isRealString(params.name)|| !isRealString(params.name))
       {
          callback('name and room name are required');
       }
       socket.join(params.room);

       //io.emit --->io.to('the office fans').emit,
       //socket.broadcast.emit -->socket.broadcast.io('the office fans').emit
       //socket.emit
       socket.emit('newMessage',generateMessage('admin','welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('admin',`${params.name} has joined`));
       callback();
    });
	

// socket.emit('test',{
// 		from:"server",
// 		text:"server is sending the data,u shoud see in the browser"
// 	});
	// socket.on('createEmail',(newEmail)=>{
 //      console.log('create a mail',newEmail);
	// });

	socket.on('createMessage',(message,callback)=>{
      console.log('create message',message);
	  //io.emit will be used for every single user which is connected to network
	  io.emit('newMessage',generateMessage(message.from,message.text));
	  // socket.broadcast.emit('newMessage',{
	  // 	from:message.from,
	  // 	text:message.text,
	  // 	createdAt:new Date().getTime()
	  // });
	  callback("this is from the server");
	});
	
	//for geolocation
	socket.on('createLocationMessage',(coords)=>{
       io.emit('newLocationMessage',generateLocationMessage('admin',coords.latitude,coords.longitude));
	});
	
	socket.on('disconnect',()=>{
		console.log('user was disconnected from server');
	});


	
});


//now since we are listening to the http server we must remove the app server
server.listen(port,()=>{
	console.log(`server is running on ${port}`);
});