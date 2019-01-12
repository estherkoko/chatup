const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');//body-parser middleware
const cors = require('cors');
const passport = require('passport');
//const app = express();
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;//port number
const config = require('./config/db');
const users = require('./routes/api/users');
const messages = require('./routes/api/messages');
const fs = require('fs');


require('./config/passport')(passport);

//use mongoose to connect to mongodb
mongoose.connect(config.database);

//Check connection
mongoose.connection.on('connected', () =>{
  console.log('Connected to db: ' + config.database);
});

//Error with DB connection
mongoose.connection.on('error', (err)=>{
  console.log('Database encountered an error: ' + err);
});

//CORS Middleware
app.use(cors());
//app.use(cors({origin: 'http://localhost:4200'}));
//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
//header("Access-Control-Allow-Origin: *");
//body parser middleware to grab the data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Set static folder
//app.use(express.static(path.join(__dirname, 'dist/chatservice')));
/*app.get('*', function(req, res) {
  res.sendFile('dist');
});*/
// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.set('view engine', 'html'); 


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', users);
app.use('/api/messages', messages);


/* socket stuf */
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}
//listen for new connection event for incoming sockets

io.sockets.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });

  //listen for client message
  socket.on('new-message', function (data) {
    console.log("sendMessage" ,data);
  //send message to client
   io.emit('new-message', data);  
   console.log('receive', data)
  });
});
/* socket stuff end */
http.listen(port, ()=>{
    console.log("server is listening on port" + port);
});

module.exports=app;