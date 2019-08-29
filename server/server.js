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
var groups = require('./routes/groups')
app.use(bodyParser.json());
app.use(morgan('combine'));
app.use(cors());
app.use('/api/auth', auth);
app.use('/api/posts', post);
app.use('/api/groups', groups);

io.on('connection', socket => {
  console.log('io connection');
  socket.on('joinChat', (user, callback) => {
    console.log('user connect to chat: ', user);
    if (!user) return callback('Enter valid user data!');
    let room = user.id_group;
    callback({id: socket.id});
    // usuwanie użytkownika na wypadek jeżeli już istnieje
    users.remove(room);
    // podlączenie użytkownika do konkretnego pokoju
    socket.join(room);
    // dodanie użytkownika do listy 'podlączonych do servera'
    users.add({id: socket.id, name: user.name, room: room});

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
    socket.broadcast.to(room).emit('newMessage', {
      name: 'sggw-bot',
      message: `${users.getUserById(socket.id).name} - joined.`,
    });
    socket.on('newMessage', (data, callback) => {
      if (data.message == '') return callback('Wiadomość nie może być pusta!');
      else {
        console.log('wiadomość od klienta: ', data);
        // io.emit - wysyła event do wszystkich podłączonych
        // io.emit('newMessage', data);
        // socket.emit('newMessage', {
        //   name: 'sggw-bot',
        //   message: `Welcome, ${users.getUserById(socket.id).name}`,
        // });
        io.to(room).emit('newMessage', {
          name: users.getUserById(socket.id).name,
          message: data.message,
          id_account: data.id_account,
        });
      }
    });
    socket.on('leave', (user, callback) => {
      socket.leave(user.id_group);
      users.remove(user.id_group);
      // socket.join('fffff');
      // io.to('fffff').emit('newMessage', {
      //   name: 'sggw-bot',
      //   message: `Welcome, change Name`,
      // });
    });
  });
  socket.on('joinPost', (user, callback) => {
    if (!user) return callback('Coś poszło nie tak :(');
    else {
      let room = 1;
      callback({id: socket.id});
      // usuwanie użytkownika na wypadek jeżeli już istnieje
      users.remove(room);
      // podlączenie użytkownika do konkretnego pokoju
      socket.join(room);
      // dodanie użytkownika do listy 'podlączonych do servera'
      users.add({id: socket.id, name: user.name, room: room});
      // dodawanie nowego postu (nasłuchiwanie nowego postu)
      socket.on('newPost', (data, callback) => {
        if (data.content == '')
          return callback('Wiadomość nie może być pusta!');
        else {
          let date = new Date()
          database
            .query(
              `insert into post (content,id_group,id_account, date_created)
               values ('${data.content}',1, ${
                data.id_account
              },'${ date
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ')}');`
            )
            .then(row => {
              console.log('*************: ',row)
              io.to(room).emit('newPost', {...data });
              console.log('post zapisano pomyślnie');
            })
            .catch(err => {
              console.log(err);
            });
          console.log('wiadomość od klienta: ', data);
        }
      });
    }
  });
});
var port = process.env.PORT || 3000;

server.listen(3000, () => {
  console.log('Listening on port ' + port);
});
