const mongoose = require('mongoose');

const message = mongoose.model('message', {
    sender: String,
    receiver: String,
    message : String,
    created_date: {type: Date, default: Date.now}

});

//export message
module.exports = {message};