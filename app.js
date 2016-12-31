var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var reply = require('./reply');

var fs = require('fs');
var https = require('https');

var options = {
   key  : fs.readFileSync('./secure/server.key'),
   cert : fs.readFileSync('./secure/server.crt')
};


var app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', reply)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send('Not Found...' + '(' + req.originalUrl + ')');
});

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.send('Error occured...' + '(' + req.originalUrl + ')');
});

app.set('port', 3000);
var server = https.createServer(options,app);
server.timeout = 5000;

server.listen(app.get('port'), function() {
    console.info('server is ready for serving on port ' + app.get('port'));
});
