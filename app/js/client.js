var React = require('react');
var ReactDOM = require('react-dom');

var Comment = React.createClass({
  rawMarkup: function() {
    var rawText = this.props.children.toString();
    return { __html: rawText };
  },
  render: function() {
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
        console.error("CommentBox ajax GET Error:",this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    $.ajax({
      url: this.props.url,
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(comment),
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error("CommentBox ajax post error:",this.props.url, status, err.toString());
      }.bind(this)
    });
    comment._id = Date.now().toString();
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
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
      <div className="commentList">
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
