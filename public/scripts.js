let socket = io()
$('#buttonsend').click(() => {
    socket.emit('msg_send', {
      
      msg: $('#inputfield').val()
    })
  
   $('#ulMsgs').append($('<li>').text(`Me :`+ $('#inputfield').val() ))
    
    $('#inputfield').val(" ")
  })
  
  socket.on('msg_rcvd', (data) => {
    $('#ulMsgs').append($('<li>').text(
      `${data.msg}`
    ))
  })