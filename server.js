const express = require('express');
const path = require('path');

const app = express();

const messages = [];

const socket = io();

/* Listeners */
socket.on('message', ({ author, content }) => addMessage(author, content));

/* Emiters */

app.use(express.static(path.join(__dirname + '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.listen(8000, () => {
  console.log('Server running on port 8000');
});