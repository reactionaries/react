const React = require('react');
const ReactDom = require('react-dom');
var bears = ["name": "Yogi", "name": "Teddy"];

var Bear = React.createClass({
  render: function () {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <button onClick={this.props.onClick}>Relocate this bear</button>
      </div>
    )
  }
})

var App = React.createClass({
  deleteBear: function (bear) {
    this.state.bears.splice(this.state.bears.indexOf(person), 1);
    this.setState({bears: this.state.bears});
  },

  getInitialState: function () {
    return {
      bears: this.props.people.splice(0)
    }
  },
  render: function () {
    var that = this;
    return (
      <div>
        {this.state.bears.map(function (bear){
          return (
            <Bear onClick={that.deleteBear.bind(null, bear)} name={bear.name}></Bear>
          )
        })}
      </div>
    )
  }
})
ReactDom.render(<App></App>, node);
