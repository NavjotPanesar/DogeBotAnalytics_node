var mongoose = require('mongoose');

var commandSchema = mongoose.Schema({
  tweetId: String,
  username: String,
  command: String,
  commandOperands: String,
  timeTaken: Number,
  date: { type: Date, default: Date.now }
});

commandSchema.statics.getList = function(callback){
  this.distinct('command', function (err, result) {
          if (err) {
              console.log(err);
          } else {
              callback(result);
          }
      });
}

commandSchema.statics.getCommand = function(command, callback){
  this.find({"command":command},function (err, tweets) {
      if (err){
        console.log(err);
      } else {
        callback(tweets);
      }
    })
}

commandSchema.statics.getCount = function(command, callback){
    this.count({"command":command},function (err, count) {
      if (err){
        console.log(err);
      } else {
        callback(count);
      }
    })
}

commandSchema.statics.getAverageTime = function(command, callback){

    this.aggregate([
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
                callback(result);
            }
        });
}

commandSchema.statics.getTimeSummary = function( callback){

   this.aggregate([
           { $group: {
               _id: "$command",
               averageTime: { $avg: "$timeTaken"  }
           }}
       ], function (err, result) {
           if (err) {
               console.log(err);
           } else {
               callback(result);
           }
       });
}

commandSchema.statics.getUsageSummary = function( callback){

   this.aggregate([
           { $group: {
               _id: "$command",
               usageCount: { $sum: 1 }
           }}
       ], function (err, result) {
           if (err) {
               console.log(err);
           } else {
               callback(result);
           }
       });

}

commandSchema.statics.getUsageByDate = function( callback){

   this.aggregate([
           { $group: {
               _id: "$date",
               usageCount: { $sum: 1 }
           }}
       ], function (err, result) {
           if (err) {
               console.log(err);
           } else {
               callback(result);
           }
       });

}



module.exports = mongoose.model('Command', commandSchema);