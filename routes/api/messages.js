const express = require('express');
const router = express.Router();
const {message}= require('../../models/message');


//post request - to send data
router.post('/', (req, res) => {
    //create object of message callled myMessage - send details of message using request.body object
    const myMessage = new message({
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
        sender_name: req.body.sender_name,
        receiver_name: req.body.receiver_name,
        content: req.body.content,
        created_date: req.body.created_date

    });
    //insert new record into mongo database using the save object
    myMessage.save((err, doc)=> {
        if (!err) {res.send(doc);}
        else {console.log('Error in Message Save : ' + JSON.stringify(err, undefined, 2));}

    });
});

router.get('/', (req, res) => {
    message.find((err, docs) => {
        if (!err) {
            //res.send(docs);
            socket.emit(res);
            console.log('emit working');
        }
        else {console.log('Error in Retrieving Messages : ' + JSON.stringify(err, undefined, 2));}
    });
});



//to get messages between two users
router.post('/getMessages', (req, res, next) => {
    message.find()
    .or([
        { $and: [{sender_id: req.body.user1}, {receiver_id: req.body.user2}] },
        { $and: [{sender_id: req.body.user2}, {receiver_id: req.body.user1}] }
    ])
    .exec(function (err, results) {
        if (!err) {res.send(results);}
        else {console.log('Error in Retrieving Messages : ' + JSON.stringify(err, undefined, 2));}
    });
});


module.exports=router;