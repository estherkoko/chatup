//var User = mongoose.model("User", userSchema);
var crypto = require('crypto');
var jwt = require('jsonwebtoken');//generate json web token for the model so that api can send it out a response 
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
newUserSchema.methods.validPassword(password, ()=>{
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash ===hash;
});

newUserSchema.methods.generateJwt (()=>{
    let expirty = new Date();
    expiry.setDate(expiry.getDate()+ 7);

    return jwt.sign({
        _id: this._id,
        email : this.email,
        fullname : this.fullname,
        username : this.username,
        created_date: this.created_date,
        exp: parseInt(expiry.getTime()/1000),
    }, )
})