var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express();
var Command = require('./command.model.js');


// GET all tweets for a certain command  
app.get('/tweets/:command', function(req, res) {
  var command = req.params.command;
   Command.getCommand(command, function(count){
           res.json(count);
       });
});

// GET list of all commands
app.get('/', function(req, res) {
    Command.getList(function(result){
        res.json(result);
    });
});

// GET number of tweets for a command 
app.get('/count/:command', function(req, res) {
  var command = req.params.command;
  Command.getCount(command, function(count){
          res.json(count);
      });
});

// GET time it took to process tweets for a command 
app.get('/average-time/:command', function(req, res) {
  var command = req.params.command;
  Command.getAverageTime(command, function(avgTime){
            res.json(avgTime);
        });
});


/* GET all commands and their average times */
app.get('/time-summary', function(req, res) {
      Command.getTimeSummary(function(result){
                res.send(result);
            });
});

app.post('/', function(req, res) {
  if(req.body.token != 'wow'){
    res.send('2');
    return;
  }
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