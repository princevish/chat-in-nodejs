let socket = io()
do {
  var user = prompt("Enter username")
} while (!user)
$('#buttons').click(() => {
  socket.emit('msg_send', {
    users: user,
    msg: $('#inputfield').val().trim()
  })

  $('#massageboxf').append($('<div>').attr('id','mass-right').append($('<spam>').text($('#inputfield').val().trim())))

  $('#inputfield').val(" ")
  scrollToBottom()
})

socket.on('msg_rcvd', (data) => {
  var massage = `${data.msg}`
  var username = `${data.users}`
  $('#massageboxf').append($('<p>').text(username).attr('class', 'username'))
  $('#massageboxf').append($('<div>').attr('id','mass-left').append($('<spam>').text(massage)))
  scrollToBottom()
})

function scrollToBottom(){
  massageboxf.scrollTop=massageboxf.scrollHeight
}