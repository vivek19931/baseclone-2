const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/isRealString');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 8080
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();
var usersa={};
var x;


app.use(express.static(publicPath));

io.on('connection', (socket) => {
	
	socket.emit('newMessagee', (socket.id));
	
	
	
	socket.on('newus', function(data, callback) {
      if(data in usera) {
	      callback(false);
          socket.emit('userExists', data + ' username is taken! Try some other username.');
		  
         
      } else {
        
		 callback(true);
	      socket.nickname=data;
	      usera[socket.nickname]=socket;
	      console.log(usera[socket.nickname];
	      
         
		
      }
   });
	
	
  
  

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room are required');
    }

    socket.join(params.room);
		
			
		
		
    users.removeUser(socket.id);
	
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', `Welocome to ${params.room}!`));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', "New User Joined!"));

    callback();
  })

  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);

    if(user && isRealString(message.text)){
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback('This is the server:');
  })

  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);
	

    if(user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.lng))
    }
  })

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
	
	

    if(user){
      io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left ${user.room} chat room.`))
    }
  });
});



server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
})
