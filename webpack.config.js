var path = require('path');
var config = {
  entry: path.resolve(__dirname, 'app/js/client.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        presets:['react']
      }
    }]
  },
};

module.exports = config;
