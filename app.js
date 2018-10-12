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
const port = process.env.port || 3000;//port number
const config = require('./config/db');
const users = require('./routes/api/users');
const messages = require('./routes/api/messages');

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
//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//body parser middleware to grab the data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'dist')));

app.set('view engine', 'html'); 


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', users);
app.use('/api/messages', messages);

//index route
app.get('/', (req, res)=>{
  res.send("Invalid route - please check and try again");
});

//listen for new connection event for incoming sockets
io.on('connection', function(socket){
  console.log('a user connected');
});
http.listen(port, ()=>{
    console.log("server is listening on port" + port);
});

module.exports=app;