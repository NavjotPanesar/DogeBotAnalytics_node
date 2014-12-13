var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express();
var Command = require('./command.model.js');


// GET all tweets for a certain command  
app.get('/tweets/:command', function(req, res) {
  var command = req.params.command;
  Command.find({"command":command},function (err, tweets) {
    if (err){
      console.log(err);
    } else {
      res.json(tweets);
    }
  })
});

// GET list of all commands
app.get('/', function(req, res) {
  Command.distinct('command', function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});

// GET number of tweets for a command 
app.get('/count/:command', function(req, res) {
  var command = req.params.command;
  Command.count({"command":command},function (err, count) {
    if (err){
      console.log(err);
    } else {
      res.json(count);
    }
  })
});

// GET time it took to process tweets for a command 
app.get('/average-time/:command', function(req, res) {
  var command = req.params.command;
  Command.aggregate([
        { $match: {
            command: command
        }},
        { $group: {
            _id: "$command",
            averageTime: { $avg: "$timeTaken"  }
        }}
    ], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});


/* GET all commands and their average times */
app.get('/time-summary', function(req, res) {
  Command.aggregate([
        { $group: {
            _id: "$command",
            averageTime: { $avg: "$timeTaken"  }
        }}
    ], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/', function(req, res) {
  var body = req.body;
  var command = new Command(req.body);
  command.save(function (err) {
      if (err){
        res.send('1');
      } else {
        res.send('');
      }
  });
 
});