const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');//body-parser middleware
const cors = require('cors');
const passport = require('passport');
const app = express();
const mongoose = require("mongoose");
const port = 3000;//port number
var favicon = require('serve-favicon');
var logger = require('morgan');
const config = require('./config/db');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const users = require('./routes/users');

mongoose.Promise = global.Promise;

//CORS Middleware
app.use(cors());
//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//body parser middleware to grab the data
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'dist')));

app.set('view engine', 'html'); 
app.use(logger('dev')); 
app.use(bodyParser.urlencoded({'extended':'false'}));  


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());



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


app.use('/users', users);

//index route
app.get('/', (req, res)=>{
  res.send("Invalid route - please check and try again");
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//use this to display our actual html page and use the sendfile command to do sto
//index route
/*************socket */
var userCount = 0;

io.on('connection', function (socket) {
  console.log('User Connected');
  userCount++;
  io.sockets.emit('userCount', { userCount: userCount });
  socket.on('disconnect', function() {
    userCount--;
    io.sockets.emit('userCount', { userCount: userCount });
    console.log('User Disconnected');
  });
    socket.on('saveMessage', function (data){
      console.log(data);
      io.emit('newMessage', {message: data});
    });
});
/********************* */

mongoose.model('users', {name: String});
app.get('/allusers', function(req, res) {
  mongoose.model('users').find(function(err, users){
    res.send(users);
   // res.send('Hello World');
  console.log("I work");
  });
  
});
//add router for wine collection - request and response
//execute get request =>localhost:3000/wine/list
/*
app.get('/allusers', (req, res) => {
  allUsers.find((err, docs) => {
      if (!err) {res.send(docs);}
      else {console.log('Error in Retrieving Wines : ' + JSON.stringify(err, undefined, 2));}
  });
});
*/
io.on('connection', function(client) {  
  console.log('Client connected...');


  client.on('messages', function(data) {
        // client.emit('broad', data);
         //client.broadcast.emit('broad',data);
         //var myUser = data.request
  });

  client.on('join', function(data) {
      console.log('id: '+data._id);
      //console.log('message: '+data.message);
      client.emit('broad', data);
      //client.broadcast.emit('broad',data);
      //save it to a database
  });
  
});




/*
this.socket = io(this.BASE_URL, { query: `userId=${userId}` });
http.listen(4200, function(){
  console.log('listening on *:3000');
});*/
//static folder
//app.use(express.static(path.join(__dirname, 'app')));
//start the server on port 3000

http.listen(port, ()=>{
    console.log("server is listening on port" + port);
});

module.exports=app;