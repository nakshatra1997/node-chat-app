const path=require('path');
const http=require('http');

const {generateMessage,generateLocationMessage}=require('./utils/message');
const {isRealString}=require('./utils/validation');
const publicPath=path.join(__dirname,'../public');
const {Users}=require('./utils/users');

const socketIO=require('socket.io');
const express=require('express');
const port=process.env.PORT||3000;
var app= express();
var server=http.createServer(app);
var io=socketIO(server);
var users=new Users();

app.use(express.static(publicPath));
io.on('connection',(socket)=>{
	console.log('new user connected');
    socket.on('join',(params,callback)=>{
       if(!isRealString(params.name)|| !isRealString(params.name))
       {
          return callback('name and room name are required');
       }
       socket.join(params.room);
       users.removeUser(socket.id);
       users.addUser(socket.id,params.name,params.room);
       //now we will use io.to().emit //so that the users list get updated in the room
       io.to(params.room).emit('updateUserList',users.getUserList(params.room));
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
      // console.log('create message',message);
      var user=users.getUser(socket.id);
      if(user&& isRealString(message.text))
      {
        io.to(user[0].room).emit('newMessage',generateMessage(user[0].name,message.text));;
      }
	  //io.emit will be used for every single user which is connected to network
	 
	  // socket.broadcast.emit('newMessage',{
	  // 	from:message.from,
	  // 	text:message.text,
	  // 	createdAt:new Date().getTime()
	  // });
	  callback("this is from the server");
	});
	
	//for geolocation
	socket.on('createLocationMessage',(coords)=>{
		var user=users.getUser(socket.id);
		if(user)
		{
           io.to(user[0].room).emit('newLocationMessage',generateLocationMessage(user[0].name,coords.latitude,coords.longitude));
		}
       
	});
	
	socket.on('disconnect',()=>{
		
      var user=users.removeUser(socket.id);
      if(user)
      {
        io.to(user[0].room).emit('updateUserList',users.getUserList(user[0].room));
        io.to(user[0].room).emit('newMessage',generateMessage('Admin',`${user[0].name} has left.`));
      }
		//io.to().emit to emit event to every single person

	});
});


//now since we are listening to the http server we must remove the app server
server.listen(port,()=>{
	console.log(`server is running on ${port}`);
});