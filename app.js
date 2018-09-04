const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');//body-parser middleware
const cors = require('cors');
const passport = require('passport');
const app = express();
const mongoose = require("mongoose");
const port = 3000;//port number
const users = require('./routes/users');
app.use(cors());//CORS Middleware
app.use(bodyParser.json());//body parser middleware to grab the data
app.use(bodyParser.urlencoded({extended:true}));

mongoose.Promise=global.Promise;

//use mongoose to connect to mongodb
mongoose.connect("mongodb://localhost:27017/chat");
app.use('/users', users);

//db schema
var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
  });

  //registered user schema
var newUserSchema = new mongoose.Schema({
  fullname : String,
  username : String,
  email : String,
  password : String,
  created_date: {
    type: Date,
    default: Date.now}
});
var Registration = mongoose.model("Registration", newUserSchema);
var User = mongoose.model("User", userSchema);


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


//send data to db
app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    var userData = new Registration(req.body);
    myData.save()
      .then(item => {
        res.send("item saved to database");
      })
      userData.save()
      .then(item => {
        res.send("item saved to database");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });

app.get('/usercheck',(req, res)=>{
  Registration.findOne({username: req.query.username}) 
  .then(item =>{
    res.send(item.email);
    //console.log(doc);
   // print(tojson)
 
  })
   .catch(err => {
     console.error(err);
   })
  
});