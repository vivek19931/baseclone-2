let socket=io();

var paramsname;


function scrollToBottom() {
  let messages = document.querySelector('#messages').lastElementChild;
  messages.scrollIntoView();
}
var block=[];
socket.on('connect', function() {
  let searchQuery = window.location.search.substring(1);
  let params = JSON.parse('{"' + decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g, ' ').replace(/=/g,'":"') + '"}');
   paramsname=params.name;
	let room=params.room;
	

  
  
  
		  


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
	console.log(paramsname);
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
 color:message.color,
	  
	  links:message.links,
	  
    createdAt: formattedTime
  });

  const div = document.createElement('div');
  div.innerHTML = html

  document.querySelector('#messages').appendChild(div);
  scrollToBottom();
}
});




































socket.on('imgMessage', function(message) {
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
	  links:message.links,
	  
    createdAt: formattedTime
  });

  const div = document.createElement('div');
  div.innerHTML = html

  document.querySelector('#messages').appendChild(div);
  scrollToBottom();
}
});























































socket.on('whisper', function(message) {
	b=message.nick;
	l=message.msg;
	var link=l.trim();
	    if(block.indexOf(b) > -1) {
    console.log('error');
		    
         
      }
	if (l=paramsname) {
		console.log('error');
	}
	
	
	if(link.substr(0, 14)==='https://www.yo')
		
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
	
	
		if( link.substring(link.length - 4, link.length)==='.gif' || link.substring(link.length - 4, link.length)==='.jpg'  || link.substring(link.length - 5, link.length)==='.jpeg' )
		
	{
				
	
		
  const formattedTime = moment(message.createdAt).format('LT');
  const template = document.querySelector('#message-template').innerHTML;
  const html = Mustache.render(template, {
    from: message.nick,
    
	  image:message.msg,
    createdAt: formattedTime
  });

  const div = document.createElement('div');
  div.innerHTML = html

  document.querySelector('#messages').appendChild(div);
  scrollToBottom();
	
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



























document.querySelector('#submit-btn').addEventListener('click', function(e) {
  e.preventDefault();

  socket.emit("createMessage", {
    text: document.querySelector('input[name="message"]').value,
	  
	  
  }, function() {
    document.querySelector('input[name="message"]').value = '';
  })
	  
	  






	  
	  
  })



socket.on('value', function(message) {
	
	
	document.querySelector('input[name="name"]').value =paramsname;
})


 



  



	












