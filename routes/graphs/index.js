var express = require('express');
var app = module.exports = express();
var timeComparison = require('./time-comparison');
app.use('/time-comparison', timeComparison)

var usageSummary = require('./usage-summary');
app.use('/usage-summary', usageSummary);

var usageTimeline = require('./usage-timeline');
app.use('/usage-timeline', usageTimeline);

/* GET list of graph types */
app.get('/', function(req, res) {
    res.send('time-comparison');
    res.send('usage-summary');
    res.send('usage-timeline');
});

