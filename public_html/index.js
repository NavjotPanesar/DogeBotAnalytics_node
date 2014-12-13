var express = require('express');
var request = require('request');
var app = module.exports = express();

/* GET all tweets for a certain command  */
app.get('/', function(req, res) {
    request("commands", function(error, response, body) {
        res.send(error);
     // res.send(response);
    });
});