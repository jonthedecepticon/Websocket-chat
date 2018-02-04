// Socket.io Connection
// var socket = io.connect('http://localhost:5000/');
var socket = io.connect('https://websocket-io-chat-app.herokuapp.com/');

var message = document.getElementById('message'),
    modal = document.getElementById('modal'),
    signIn = document.getElementById('sign-in'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');

function runScript(e) {
  if (e.keyCode == 13) {
    btn.click()
    return false;
  }
}

function checkForName(e) {
  if (handle.value.length !== 0) {
    signIn.classList.remove("disabled");
    document.getElementById('uzername').innerHTML = handle.value;
    modal.remove();
    document.getElementById('slack-container').style.display = "block";
  }
}

// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});

message.addEventListener('change',()=>{
  socket.emit('typingstop');
});

message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value);
})

var randomNum = Math.floor(Math.random() * 31) + 50;

// Listen for events
socket.on('chat', function(data){
  var time = new Date();
  feedback.innerHTML = '';
  output.innerHTML += '<li class="message"><div class="user-icon"><img src="http://socialmediaweek.org/wp-content/blogs.dir/1/files/slack-pattern-940x492.jpg" style="margin-left: '+ '-' + randomNum + 'px;'+'"/></div><div class="body"><div class="username"> ' + data.handle + ' <span class="time-sent">'+time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })+'</span></div><div class="text">' + data.message + '</div></div></li>'
});

socket.on('typing', function(data){
  feedback.innerHTML = '<span class="typing-message">' + data + ' is typing...</span>';
});

socket.on('typingstop',function(data){
  feedback.innerHTML="";
});
