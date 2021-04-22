const express = require('express');
const socketio = require('socket.io')
const http = require('http')
const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('connected with socket id =', socket.id)
    socket.on('msg_send', (data) => {

        socket.broadcast.emit('msg_rcvd', data)

    })

})

app.use('/', express.static(__dirname + '/public'))
server.listen(port, function (error) {
    if (error) {
        console.log("error in running the server", error);
    } else {
        console.log(`server is running on the port:${port}` );
    }
});