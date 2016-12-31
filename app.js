var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var reply = require('./reply');
var app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/reply', reply)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send('Not Found...' + '(' + req.originalUrl + ')');
});

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.send('Error occured...' + '(' + req.originalUrl + ')');
});

app.set('port', 3000);
var server = http.createServer(app);
server.timeout = 5000;

server.listen(app.get('port'), function() {
    console.info('server is ready for serving on port ' + app.get('port'));
});