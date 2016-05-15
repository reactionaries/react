var React = require('react');
var ReactDOM = require('react-dom');
var marked = require('react-marked');

var Comment = React.createClass({
  rawMarkup: function() {
    var rawText = this.props.children.toString();
    return { __html: rawText };
  },
  render: function() {
    console.log(this.props);
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.bear}
        </h2>
        <span dangerouslySetInnerHTML={ this.rawMarkup() } />
      </div>
    );
  }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    console.log("data: ", comment);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment bear={comment.bear} key={comment._id}>
          {comment.message}
        </Comment>
      );
    });
    return (
      <div className="commentList" key={this.props.id}>
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return {bear: '', message: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({bear: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({message: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var bear = this.state.bear.trim();
    var message = this.state.message.trim();
    if (!message || !bear) {
      return;
    }
    this.props.onCommentSubmit({bear: bear, message: message});
    this.setState({bear: '', message: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.bear}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.message}
          onChange={this.handleTextChange}
        />
      <input type="submit" value="POST" />
      </form>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('root')
);
