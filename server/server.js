// if nodemon don't work: echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = require('./classes/users')();
const HOME_ROOM = '112233';
var cors = require('cors');
var auth = require('./routes/auth');
app.use(bodyParser.json());
app.use(morgan('combine'));
app.use(cors());
app.use('/api/auth', auth);

io.on('connection', socket => {
  console.log('io conecdatation');
  socket.on('join', (user, callback) => {
    console.log('user connect: ', user);
    if (!user) return callback('Enter valid user data!');
    callback({id: socket.id});

    // podlączenie użytkownika do konkretnego pokoju
    socket.join(HOME_ROOM);
    // usuwanie użytkownika na wypadek jeżeli już istnieje
    users.remove(HOME_ROOM);
    // dodanie użytkownika do listy 'podlączonych do servera'
    users.add({id: socket.id, name: user.name, room: HOME_ROOM});

    // io.to(HOME_ROOM).emit('usersUpdate', {
    //   name: 'sggw-bot',
    //   message: `${users.getUserById(socket.id).name} - joined`,
    // });
    // wysyła event tylko do konkretnego użytkownika
    socket.emit('newMessage', {
      name: 'sggw-bot',
      message: `Welcome, ${users.getUserById(socket.id).name}`,
    });
    // socket.brodcast - wysyła wszystkim oprucz mnie.
    socket.broadcast.to(HOME_ROOM).emit('newMessage', {
      name: 'sggw-bot',
      message: `${users.getUserById(socket.id).name} - joined.`,
    });
  });
  socket.on('newMessage', (data, callback) => {
    if (data.message == '') return callback('Wiadomość nie może być pusta!');
    else {
      console.log('wiadomość od klienta: ', data);
      // io.emit - wysyła event do wszystkich podłączonych
      io.emit('newMessage', data);
    }
  });
  socket.on('changeRoom', (data, callback) => {
    if (!data) return callback('Coś poszło nie tak');
    socket.leave(HOME_ROOM);
    socket.join('fffff');
    io.to('fffff').emit('newMessage', {
      name: 'sggw-bot',
      message: `Welcome, change Name`,
    });
  });
});
var port = process.env.PORT || 3000;

server.listen(3000, () => {
  console.log('Listening on port ' + port);
});
