const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
let randomColor = require('randomcolor');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/isRealString');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 8080
let app = express();

let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

var usera={};
var x;
 


app.use(express.static(publicPath));

io.on('connection', (socket) => {
	let color = randomColor();
	 socket.color = color; 
	
	socket.emit('newMessagee', (socket.id));
	
	
	
	
	socket.on('newus', function(data, callback) {
      if(data in usera) {
	      callback(false);
          socket.emit('userExists', data + ' username is taken! Try some other username.');
		  
         
      } else {
       
		
	      socket.nickname=data;
	      usera[socket.nickname]=socket;
	      
	      
         
		
      }
   });
	
	
  
  

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room are required');
    }

    socket.join(params.room);
		
			
		
		
    users.removeUser(socket.id);
	
    users.addUser(socket.id, params.name, params.room,color);

    io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage( `Welocome to ${params.room}!`));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage(`${params.name} joined`));

    callback();
  })

  socket.on('createMessage', (message, callback) => {
	  let user = users.getUser(socket.id);
	  	   
	  var z=message.text;
    
	  
	  var msg = z.trim();
	  if(msg.substr(0, 3)==='/w '){
		  msg=msg.substr(3);
		  var ind=msg.indexOf(' ');
		  if(ind !== -1){
			  var name=msg.substring(0, ind);
			  var msg=msg.substring(ind + 1);
			  if(name in usera){
				  usera[name].emit('whisper', {msg: msg, nick: socket.nickname});
			
				    socket.emit('blocks', {msg: msg, nick: socket.nickname});
				  socket.emit('whisper', {msg: msg, nick: socket.nickname});
				  console.log('whisper');
			  }
			  else{
				  console.log('e');}
		  }
		  else{ 
			  console.log('ee');
		  }
	  }
	  else{
		  
		    var z=message.text;
    
	  
	  var msg = z.trim();
	  if(msg.substring(msg.length - 4, msg.length)==='.gif' || msg.substring(msg.length - 4, msg.length)==='.jpg'  || msg.substring(msg.length - 5, msg.length)==='.jpeg')
	  {
		    io.to(user.room).emit('imgMessage', generateMessage(user.name, message.text));
		  
		
			  }
	  
		  
		
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
	
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  

   else{ 
	    if(user && isRealString(message.text)){
	   
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		    socket.emit('empty', generateMessage(user.name, message.text,message.image,message.links,user.color));
	    }
    
    
  }
	  
    
    
  
  }
	   socket.emit('value', generateMessage(user.name, message.text,message.image,message.links,user.color));
  });
	
	
	

	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	



  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
	  
	  
	  if(!socket.nickname) return;
	  delete usera[socket.nickname];
	  
	
	

    if(user){
      io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left ${user.room} chat room.`))
    }
  });
});



server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
})
