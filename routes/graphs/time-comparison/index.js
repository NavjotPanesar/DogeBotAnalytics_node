var express = require('express');
var app = module.exports = express();

var Command = require('../../commands/command.model.js');
/* GET pretty html graph */
app.get('/', function(req, res) {
    getGraphData(function(graphData){
        res.render('time-comparison', graphData);
    });
});

/* GET basic graph, only image */
app.get('/image/:width/:height', function(req, res) {
    getGraphData(function(graphData){
            graphData.width = req.params.width;
            graphData.height = req.params.height;
            res.render('time-comparison-plain', graphData);
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
                var graphData = {'labels': JSON.stringify(commandList), 'data': JSON.stringify(timeList)};
                callback(graphData);
            });
}