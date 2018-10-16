const mongoose = require('mongoose');
const u= require('../models/user');

const message = mongoose.model('message', {
    sender_id:  String,
    sender_name: String,
    receiver_id: String,
    receiver_name: String,
    content : String,  
    created_date: {type: Date, default: Date.now}

});

//export message
module.exports = {message};