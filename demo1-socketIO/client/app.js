var socket = io.connect(location.href)

var txt = document.querySelector('.txt')

socket.on('receiveText', function(data) {
  txt.value = data.content
})

txt.addEventListener('input',function(e){
  socket.emit('sendText',{content:txt.value})
})
