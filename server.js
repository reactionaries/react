const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/bearChatDb');

const bearChatRouter = require(__dirname + '/lib/bear_routes_3000');

app.use(
  express.static(__dirname + '/build')
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api', bearChatRouter);
app.listen(PORT, () => console.log('bears listening on port ' + PORT));
