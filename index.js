const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const port = process.env.PORT || 8080;
const ip =process.env.IP || '0.0.0.0';
const app = express();

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    
    socket.on('msg_send', (data) => {

        socket.broadcast.emit('msg_rcvd', data)

    })

})

app.use('/', express.static(__dirname + '/public'))
server.listen(port,ip, function (error) {
    if (error) {
        console.log("error in running the server", error);
    } else {
        console.log(`server is running on the port:${port}` );
    }
});