const express = require('express');
const router = express.Router();
const Message = require('../../models/message');

//Register and instantiate new user from model
router.post('/message', (req, res, next)=>{
    let newMessage = new Message({
        sender: req.body.sender,
        receiver: req.body.receiver,
        created_date: req.body.created_date
    });
    Message.addMessage(newMessage,(err, message)=>{
        if(err){
            res.json({success: false, msg:'Message was not sent'});
        } else {
            res.json({success: true, msg: 'Message sent successfully '});
        }
    });
  
});

module.exports=router;