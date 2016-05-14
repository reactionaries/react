const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  bear: String,
  message: {type: String, default: 'salmonzzzz everywhere!!!'}
});

module.exports = exports = mongoose.model('Comment', commentSchema);
