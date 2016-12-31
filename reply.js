var express = require('express');
var router = express.Router();

var lineBot = require('line-bot-sdk');
var cfg = require('./config.json');

var client = LineBot.client({cfg});

router.get('/',function(req, res){
   res.json({resCode : 200, resMsg : "Success"}); 
});

router.post('/webhook',function (req, res) {
    console.log('request : ' + req);
});

module.exports = router;