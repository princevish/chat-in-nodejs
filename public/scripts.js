let socket = io()
let list = new Set();
let a = 0;
var to;

function onlineuser() {
  socket.on('online', (data) => {
 $('option').remove()
 $('#chatonline').append(new Option('All User',''))
    for (let x in data) {

      let id = data[x].id
      let user = data[x].user
      list.add(id)

      if (list.has(`${id}`)) {
       
        $('#chatonline').append(new Option(user, id))
      }
    }
  })
}


do {
  var user = prompt("Enter username")
} while (!user)

socket.emit('adduser', user)


$('#chatonline').change(function () {
  var $option = $(this).find('option:selected');
  var value = $option.val();
  var text = $option.text();
  to = value
});


function addmassage(to) {

  socket.emit('msg_send', {
    to: to,
    users: user,
    msg: $('#inputfield').val().trim()
  })

  $('#massageboxf').append($('<div>').attr('id', 'mass-right').append($('<spam>').text($('#inputfield').val().trim())))

  $('#inputfield').val(" ")
  scrollToBottom()
}
$('#buttons').click(() => {

  addmassage(to)

});





socket.on('msg_rcvd', (data) => {
  var massage = `${data.msg}`
  var username = `${data.users}`
  $('#massageboxf').append($('<p>').text(username).attr('class', 'username'))
  $('#massageboxf').append($('<div>').attr('id', 'mass-left').append($('<spam>').text(massage)))
  scrollToBottom()
})

function scrollToBottom() {
  massageboxf.scrollTop = massageboxf.scrollHeight
}
$('#inputfield').keypress(function (e) {
  var key = e.which;
  if (key == 13) // the enter key code
  {
    addmassage()
  }
});

onlineuser()