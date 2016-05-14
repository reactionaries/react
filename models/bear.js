const mongoose = require('mongoose');

var bearSchema = new mongoose.Schema({
  name: String,
  hometown: String,
  fishPreference: {type: String, default: 'salmons'}
});

module.exports = exports = mongoose.model('Bear', bearSchema);
