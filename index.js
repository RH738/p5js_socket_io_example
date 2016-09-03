var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mousePositions = [];

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    for (var i = 0; i < mousePositions.length; i++) {
        io.emit('newMouseEvent', mousePositions[i]);
    }
    socket.on('mousePressed', function(msg) {
        mousePositions.push(msg);
        io.emit('newMouseEvent', msg);
    });
});

http.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
