const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

 
//registered user schema
  const UserSchema =  mongoose.Schema({
    fullname : String,
    username : {type: String, unique: true},
    email : {type: String, required: true},
    password : {type: String, required: true},
    created_date: {type: Date, default: Date.now}
  });

  const User = module.exports= mongoose.model("User", UserSchema);

  module.exports.getUserById=function(id, callback){
      User.findById(id, callback);
  }

  module.exports.getUserByUsername = function(username, callback){
      const query = {username:username}
      User.findOne(query, callback);
      //console.log('this is query' +  User.findOne(query, callback));
  }

  //set the password
  module.exports.addUser = function(newUser, callback){
      bcrypt.genSalt(10, (err, salt)=>{
          bcrypt.hash(newUser.password, salt, (err, hash)=>{
              if(err) throw err;
              newUser.password=hash;
              newUser.save(callback);
          });
      });
  }
  module.exports.comparePassword = function(candidatePassword, hash, callback){
      bcrypt.compare(candidatePassword, hash, (err, isMatch)=> {
          if(err) throw err;
          callback(null, isMatch);
      });
  }
