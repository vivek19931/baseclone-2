
let socket = io();
var paramsname;
var feedback=document.getElementById('feedback');
var check;


function scrollToBottom() {
  let messages = document.querySelector('#messages').lastElementChild;
  messages.scrollIntoView();
}
var block=[];
socket.on('connect', function() {
  let searchQuery = window.location.search.substring(1);
  let params = JSON.parse('{"' + decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g, ' ').replace(/=/g,'":"') + '"}');
   paramsname=params.name;
	
	
	

  
  
  
		  


  socket.emit('join', params, function(err) {
    if(err){
      alert(err);
      window.location.href = '/';
    }else {
      console.log('No Error');
    }
  });
  
  
  socket.emit('newus', paramsname, function(err) {
    if(err){
      alert(err);
      window.location.href = '/';
    }else {
      console.log('No Error');
    }
  });
  
   socket.on('userExists', function(data) {
	   window.alert("Username already taken please choose another one");
         
		 
		 
		  location.replace("/");
		  
   })
  
  

  
  
  
  
});




  
  
 











socket.on('disconnect', function() {
  console.log('disconnected from server.');
});

socket.on('updateUsersList', function (users) {
  let ol = document.createElement('ol');

  users.forEach(function (user) {
	  
	  
    let li = document.createElement('li');
    li.innerHTML =
	    user;
    ol.appendChild(li);
  });

  let usersList = document.querySelector('#users');
  usersList.innerHTML = "";
  usersList.appendChild(ol);
})


socket.on('blocks', function(data, callback) {
	uq=data.msg;
	console.log(uq);
        if(block.indexOf(uq) > -1) {
    block.pop(uq);
         
      }
        
		  
         
       else {
        
		 
	   
		 block.push(uq);

	      
	      
         
		
      }
   });



socket.on('newMessage', function(message) {
	feedback.innerHTML='';
	
	b=message.from;
	    if(block.indexOf(b) > -1) {
    console.log('error');
         
      }
	else{
  const formattedTime = moment(message.createdAt).format('LT');
  const template = document.querySelector('#message-template').innerHTML;
  const html = Mustache.render(template, {
    
    from: message.from,
    text: message.text,
 
	  
	  
	  
    createdAt: formattedTime
  });

  const div = document.createElement('div');
  div.innerHTML = html

  document.querySelector('#messages').appendChild(div);
  scrollToBottom();
}
});




































socket.on('imgMessage', function(message) {
	feedback.innerHTML='';
	b=message.from;
	    if(block.indexOf(b) > -1) {
    console.log('error');
         
      }
	else{
  const formattedTime = moment(message.createdAt).format('LT');
  const template = document.querySelector('#message-template').innerHTML;
  const html = Mustache.render(template, {
    
    from: message.from,
	  color:message.color,
    
	  image:message.text,
	  
	  
    createdAt: formattedTime
  });

  const div = document.createElement('div');
  div.innerHTML = html

  document.querySelector('#messages').appendChild(div);
  scrollToBottom();
}
});







	
			
  

			
		
		

		
  

























































socket.on('whisper', function(message) {
	feedback.innerHTML='';
	b=message.nick;
	 var z=message.msg;
	console.log(z);
    
	  
	  var msg = z.trim();
	
	

	
	
	    if(block.indexOf(b) > -1 || msg.substring(msg.length - 4, msg.length)==='.gif' || msg.substring(msg.length - 4, msg.length)==='.jpg'  || msg.substring(msg.length - 5, msg.length)==='.jpeg' || msg.substr(0, 14)==='https://www.yo'||(z==paramsname)  ) {
    console.log('error');
		    
         
      }
	
			
  

			
		
		else {
	
		
  const formattedTime = moment(message.createdAt).format('LT');
  const template = document.querySelector('#message-template').innerHTML;
  const html = Mustache.render(template, {
    from: message.nick,
    text: message.msg, 
	  
    createdAt: formattedTime
  });

  const div = document.createElement('div');
  div.innerHTML = html

  document.querySelector('#messages').appendChild(div);
  scrollToBottom();
	}

	
	
});






socket.on('image', function(message) {
	feedback.innerHTML='';
	b=message.nick;
	l=message.msg;
	
	

	
	
	    if(block.indexOf(b) > -1) {
    console.log('error');
		    
         
      }
	else{
	
	 var z=message.msg;
    
	  
	  var msg = z.trim();
	  if(msg.substring(msg.length - 4, msg.length)==='.gif' || msg.substring(msg.length - 4, msg.length)==='.jpg'  || msg.substring(msg.length - 5, msg.length)==='.jpeg')
	
			
  

			
		
		 {
	
		
  const formattedTime = moment(message.createdAt).format('LT');
  const template = document.querySelector('#message-template').innerHTML;
  const html = Mustache.render(template, {
    from: message.nick,
    image: message.msg, 
	  
    createdAt: formattedTime
  });

  const div = document.createElement('div');
  div.innerHTML = html

  document.querySelector('#messages').appendChild(div);
  scrollToBottom();
	}
	
	
	}

	
	
});




socket.on('link', function(message) {
	feedback.innerHTML='';
	b=message.nick;
	
	
	

	
	
	    if(block.indexOf(b) > -1 ) {
    console.log('error');
		    
         
      }
	else{
	
	 var z=message.msg;
    
	  
	  var msg = z.trim();
	  if(msg.substr(0, 14)==='https://www.yo')
	
			
  

			
		
		 {
	
		
  const formattedTime = moment(message.createdAt).format('LT');
  const template = document.querySelector('#message-template').innerHTML;
  const html = Mustache.render(template, {
    from: message.nick,
    links: message.msg, 
	  
    createdAt: formattedTime
  });

  const div = document.createElement('div');
  div.innerHTML = html

  document.querySelector('#messages').appendChild(div);
  scrollToBottom();
	}
	
	
	}

	
	
});

































document.querySelector('#submit-btn').addEventListener('click', function(e) {
  e.preventDefault();

  socket.emit("createMessage", {
    text: document.querySelector('input[name="message"]').value,
	  
	 
	  
	  
  })
    
  
	  
	  






	  
	  
  })
type.addEventListener('keypress',function(){
	socket.emit('typing', paramsname);
	
	
});

socket.on('typing',function(data){
	
feedback.innerHTML='<p><em>'+data + ' is typing</em></p>';	
});


 socket.on('empty', function(message) {


	document.querySelector('input[name="message"]').value = '';
	  
})




 



  



	














