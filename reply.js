var express = require('express');
var router = express.Router();

var line = require('node-line-bot-api');
var cfg = require('./config.json');

line.init({
    accessToken : cfg.channelToken,
    channelSecret : cfg.channelSecret
});

var lineClient = line.client;
var lineValidator = line.validator;

router.get('/',function(req, res){
   res.json({"resCode" : 200, "resMsg" : "Success"}); 
});

router.post('/webhook',function (req, res) {
    console.log('webhook start');
    
    const promises = req.body.events.map(event => {
    // reply message
    return line.client
      .replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: 'text',
            text: event.message.text
          }
        ]
      })
  })
  Promise
    .all(promises)
    .then(() => res.json({success: true}))
});

module.exports = router;
