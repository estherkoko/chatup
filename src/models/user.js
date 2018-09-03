//var User = mongoose.model("User", userSchema);
var crypto = require('crypto');
  //registered user schema
  var newUserSchema = new mongoose.Schema({
    fullname : String,
    username : {type: String, unique: true},
    email : String,
    password : String,
    created_date: {type: Date, default: Date.now},
    hash: String,
    salt : String
  });
  //set the password
newUserSchema.methods.setPassword (password, ()=>{
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
});
//check the password