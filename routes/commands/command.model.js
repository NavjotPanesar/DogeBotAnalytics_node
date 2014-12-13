var mongoose = require('mongoose');

var commandSchema = mongoose.Schema({
  tweetId: String,
  username: String,
  command: String,
  commandOperands: String,
  timeTaken: Number
});

module.exports = mongoose.model('Command', commandSchema);