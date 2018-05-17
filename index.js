require('dotenv').config()
const app = require('express')();
const axios = require('axios');
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);

connections = [];

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connect', function (socket) {
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  socket.on('send message', function (msg) {
    if (msg) {
      let id = socket.id;
      let question = encodeURI(msg);
      io.sockets.emit('new message', {mensaje: msg, from: 'me'});

      axios.get(`http://beta.soldai.com/bill-cipher/askquestion?question=${question}&session_id=${id}&key=${process.env.SOLDAI_KEY}`)
      .then(response => {
        console.log(response.data.current_response.message);
        io.sockets.emit('new message', {mensaje: response.data.current_response.message, from: 'server'});
      })
      .catch(error => {
        console.log(error);
      });
    }
  });

  socket.on('disconnect', function () {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s socket connected', connections.length);
  });
});

http.listen(process.env.PORT, () => {
  console.log("Serving at port: " + process.env.PORT);
});

