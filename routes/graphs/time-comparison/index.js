var express = require('express');
var app = module.exports = express();

var Command = require('../../commands/command.model.js');
/* GET pretty html graph */
app.get('/', function(req, res) {
    getGraphData(function(commandList, timeList){
        var graphData = {'labels': JSON.stringify(commandList), 'data': JSON.stringify(timeList)};
        res.render('time-comparison', graphData);
    });
});

/* GET basic graph, only image */
app.get('/image/:width/:height', function(req, res) {
    getGraphData(function(commandList, timeList){
            var graphData = {'labels': JSON.stringify(commandList), 'data': JSON.stringify(timeList), 'width': req.params.width, 'height': req.params.height};
            res.render('time-comparison-plain', graphData);
        });
});

/* GET graph data only */
app.get('/data/', function(req, res) {
    getGraphData(function(commandList, timeList){
            var graphData = {'labels': commandList, 'data': timeList};
            res.send(graphData);
      });
});


var getGraphData = function(callback){
    Command.getTimeSummary(function(timeSummary){
                var commandList = [];
                var timeList = [];
                for (var i = 0; i < timeSummary.length; i++) {
                    var summaryRow = timeSummary[i];
                    commandList.push(summaryRow._id);
                    timeList.push(summaryRow.averageTime);
                }
                callback(commandList, timeList);
            });
}