const express = require('express');
const jsonParser = require('body-parser').json();
const Comment = require(__dirname + '/../models/comment');
const handleDBError = require(__dirname + '/handle_db_error');

var bearChatRouter = module.exports = exports = express.Router();

// add GET
bearChatRouter.get('/comments', (req, res) => {
  Comment.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});
// add POST
bearChatRouter.post('/comments', jsonParser, (req, res) => {
  process.stdout.write('is there a req? ', req.body);
  var newComment = new Comment(req.body);
  newComment.save((err, data) => {
    if (err) return handleDBError(err, res);

    process.stdout.write('POST received');
    res.status(200).json(data);
  });
});
// add PUT
bearChatRouter.put('/comments/:id', jsonParser, (req, res) => {
  process.stdout.write('req.body', req.body);
  var commentData = req.body;
  delete commentData._id;
  process.stdout.write('req.params', req.params);

  Comment.update({_id: req.params.id}, commentData, (err) => {
    if (err) return handleDBError(err, res);
    res.header('Access-Control-Allow-Origin', 'localhost:5000');
    process.stdout.write('PUT received');
    res.status(200).json({ msg: 'success' });
  });
});
// add DELETE
bearChatRouter.delete('/comments/:id', (req, res) => {
  Comment.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);
    process.stdout.write('DELETE received');
    res.status(200).json({ msg: 'success' });
  });
});
