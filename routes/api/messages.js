const express = require('express');
const router = express.Router();
const {message}= require('../../models/message');


//post request - to send data
router.post('/', (req, res) => {
    //create object of message callled myMessage - send details of message using request.body object
    const myMessage = new message({
        sender: req.body.sender,
        receiver: req.body.receiver,
        content: req.body.content,
        created_date: req.body.created_date

    });
    //insert new record into mongo database using the save object
    myMessage.save((err, doc)=> {
        if (!err) {res.send(doc);}
        else {console.log('Error in Wine Save : ' + JSON.stringify(err, undefined, 2));}

    });
});

router.get('/', (req, res) => {
    message.find((err, docs) => {
        if (!err) {res.send(docs);}
        else {console.log('Error in Retrieving Messages : ' + JSON.stringify(err, undefined, 2));}
    });
});


//to get messages between two users
router.post('/getmessages', (req, res, next) => {
    message.find()
    .or([
        { $and: [{sender: req.body.user1}, {receiver: req.body.user2}] },
        { $and: [{sender: req.body.user2}, {receiver: req.body.user1}] }
    ])
    .exec(function (err, results) {
        if (!err) {res.send(results);}
        else {console.log('Error in Retrieving Messages : ' + JSON.stringify(err, undefined, 2));}
    });
});

module.exports=router;