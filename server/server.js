const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const server = http.createServer(app)
const io = socketIO(server)
app.use(morgan('combine'))
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json())
// var router = express.Router();
io.on('connection', socket => {
    console.log('io conection')
    socket.on('customEmit', (data) => {
        console.log('wiadomość od klienta: ', data)
        socket.emit('test', 'Opowiedź z servera')
    })
})

app.get('/get',(req, res) => {
    
        res.send('Alocha');
     
  });



// use it before all route definitions
var port = process.env.PORT || 3000;

server.listen(3000, ()=>{
    console.log('Listening on port ' + port);
});

// app.use(express.static(publicPath))

