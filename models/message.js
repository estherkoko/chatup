const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');

//create message schema for the database
const MessageSchema = mongoose.Schema('message', {
    sender: String,
    receiver: String,
    created_date: {type: Date, default: Date.now}
})

//export message model
module.exports = {message};