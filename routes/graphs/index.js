var express = require('express');
var app = module.exports = express();
var timeComparison = require('./time-comparison');
app.use('/time-comparison', timeComparison)

/* GET list of graph types */
app.get('/', function(req, res) {
    res.send('time-comparison');
});

