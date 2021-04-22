let socket = io()
do {
  var user = prompt("Enter username")
} while (!user)
$('#buttons').click(() => {
  socket.emit('msg_send', {
    users: user,
    msg: $('#inputfield').val().trim()
  })

  $('#massageboxf').append($('<p>').text($('#inputfield').val().trim()).attr('class', 'text-right bg-success msg mb-2'))

  $('#inputfield').val(" ")
})

socket.on('msg_rcvd', (data) => {
  var massage = `${data.msg}`
  var username = `${data.users}`
  $('#massageboxf').append($('<p>').text(username).attr('class', 'username'))
  $('#massageboxf').append($('<p>').text(massage).attr('class', 'text-left bg-primary msg mb-2'))
})