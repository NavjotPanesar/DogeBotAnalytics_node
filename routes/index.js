var express = require('express');
var app = module.exports = express();
var commands = require('./commands/');
var graphs = require('./graphs/');

app.use('/commands', commands);
app.use('/graphs', graphs);

/* GET list of api routes */
app.get('/', function(req, res) {
    res.send(JSON.stringify(app.routes));
});

