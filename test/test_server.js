const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/bears_app_dev');
const bearsRouter = require(__dirname + '/../lib/bear_routes_3000');

app.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', bearsRouter);

var PORT = process.env.PORT;
app.listen(PORT, () => console.log('server up on port: ' + PORT));
