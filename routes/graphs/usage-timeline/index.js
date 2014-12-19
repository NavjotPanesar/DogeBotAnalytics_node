var express = require('express');
var app = module.exports = express();

var Command = require('../../commands/command.model.js');
/* GET pretty html graph */
app.get('/', function(req, res) {
    getGraphData(function(commandList, countList){
        //var graphData = {'labels': JSON.stringify(commandList), 'data': JSON.stringify(timeList)};
        //res.render('time-comparison', graphData);
        res.send("meh");
    });
});

/* GET basic graph, only image */
app.get('/image/:width/:height', function(req, res) {
    getGraphData(function(commandList, countList){
            //var graphData = {'labels': JSON.stringify(commandList), 'data': JSON.stringify(timeList), 'width': req.params.width, 'height': req.params.height};
            //res.render('time-comparison-plain', graphData);
            res.send("meh");
        });
});

/* GET graph data only */
app.get('/data/', function(req, res) {
    getGraphData(function(commandList, countList){
            var graphData = {'labels': commandList, 'data': countList};
            res.send(graphData);
      });
});


var getGraphData = function(callback){
    Command.getUsageByDate(function(usageSummary){
                var commandList = [];
                var countList = [];
                for (var i = 0; i < usageSummary.length; i++) {
                    var summaryRow = usageSummary[i];
                    commandList.push(summaryRow._id);
                    countList.push(summaryRow.usageCount);
                }
                callback(commandList, countList);
            });
}