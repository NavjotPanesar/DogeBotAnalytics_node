var express = require('express');
var app = module.exports = express();

/* GET all tweets for a certain command  */
app.get('/time-comparison/', function(req, res) {
    if(req.params.type == 'time-comparison'){
        res.render('time-comparison');
    }
});