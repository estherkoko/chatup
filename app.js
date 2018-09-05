const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');//body-parser middleware
const cors = require('cors');
const passport = require('passport');
const app = express();
const mongoose = require("mongoose");
const port = 3000;//port number
const config = require('./config/db');

//mongoose.Promise=global.Promise;


//CORS Middleware
app.use(cors());

//body parser middleware to grab the data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


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


const users = require('./routes/users');
app.use('/users', users);

//index route
app.get('/', (req, res)=>{
  res.send("Invalid route - please check and try again");
});

//use this to display our actual html page and use the sendfile command to do sto
//index route
app.get("/", (req, res) => {
   res.sendFile(__dirname + "/src/app/app.component.html");
});

//static folder
//app.use(express.static(path.join(__dirname, 'app')));
//start the server on port 3000
app.listen(port, ()=>{
    console.log("server is listening on port" + port);
});
