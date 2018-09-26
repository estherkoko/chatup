const express = require('express');
const router = express.Router();
//const Message = require('../../models/message');
const {message}= require('../../models/message');


//post request - to send data
router.post('/', (req, res) => {
    //create object of wine callled myWine - send details of wine using request.body object
    const myMessage = new message({
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: req.body.message,
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
        else {console.log('Error in Retrieving Wines : ' + JSON.stringify(err, undefined, 2));}
    });
});



module.exports=router;