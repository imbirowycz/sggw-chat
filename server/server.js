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
const database = require('./database');
var cors = require('cors');
var auth = require('./routes/auth');
var post = require('./routes/posts');
var groups = require('./routes/groups');
var favoriteList = require('./routes/favoriteList');
app.use(bodyParser.json());
app.use(morgan('combine'));
app.use(cors());
app.use('/api/auth', auth);
app.use('/api/posts', post);
app.use('/api/groups', groups);
app.use('/api/favoriteList', favoriteList);

io.on('connection', socket => {
  console.log('io connection');
  // socket.on('joinChat', (user, callback) => {
  //   console.log('user connect to chat: ', user);
  //   if (!user) return callback('Enter valid user data!');
  //   let room = user.id_group;
  //   callback({id: socket.id});
  //   // usuwanie użytkownika na wypadek jeżeli już istnieje
  //   users.remove(room);
  //   // podlączenie użytkownika do konkretnego pokoju
  //   socket.join(room);
  //   // dodanie użytkownika do listy 'podlączonych do servera'
  //   users.add({id: socket.id, name: user.name, room: room});

  //   // io.to(HOME_ROOM).emit('usersUpdate', {
  //   //   name: 'sggw-bot',
  //   //   message: `${users.getUserById(socket.id).name} - joined`,
  //   // });
  //   // wysyła event tylko do konkretnego użytkownika
  //   socket.emit('newMessage', {
  //     name: 'sggw-bot',
  //     message: `Welcome, ${users.getUserById(socket.id).name}`,
  //   });
  //   // socket.brodcast - wysyła wszystkim oprucz mnie.
  //   socket.broadcast.to(room).emit('newMessage', {
  //     name: 'sggw-bot',
  //     message: `${users.getUserById(socket.id).name} - joined.`,
  //   });
  //   socket.on('newMessage', (data, callback) => {
  //     if (data.message == '') return callback('Wiadomość nie może być pusta!');
  //     else {
  //       console.log('wiadomość od klienta: ', data);
  //       // io.emit - wysyła event do wszystkich podłączonych
  //       // io.emit('newMessage', data);
  //       // socket.emit('newMessage', {
  //       //   name: 'sggw-bot',
  //       //   message: `Welcome, ${users.getUserById(socket.id).name}`,
  //       // });
  //       io.to(room).emit('newMessage', {
  //         name: users.getUserById(socket.id).name,
  //         message: data.message,
  //         id_account: data.id_account,
  //       });
  //     }
  //   });

  // });
  socket.on('leave', (data, callback) => {
    console.log('live room: ', data.id_room);
    if (data.id_room) {
      socket.leave(data.id_room);
    }
  });
  socket.on('join', (room, callback) => {
    // console.log(io.sockets.adapter.rooms)
    if (!room) return callback('Nie podano indentyfikator pokoju :(');
    else socket.join(room);
  });
  socket.on('newPost', (data, callback) => {
    if (data.content == '') return callback('Wiadomość nie może być pusta!');
    else {
      let date = new Date();
      database
        .query(
          `insert into post (content,id_group,id_account, date_created)
           values ('${data.content}',${data.id_group}, ${
            data.id_account
          },'${date
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')}');`
        )
        .then(row => {
          io.to(data.id_group).emit('newPostSocket', {...data});
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
});
var port = process.env.PORT || 3000;

server.listen(3000, () => {
  console.log('Listening on port ' + port);
});
