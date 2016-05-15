const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  bear: { type: String, default: 'should be a bear' },
  message: { type: String, default: 'salmonzzzz everywhere!!!'}
});

module.exports = exports = mongoose.model('Comment', commentSchema);
