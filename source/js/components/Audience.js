var React = require('react');
var Display = require('./parts/Display');
var JoinForm = require('./parts/JoinForm');
var Ask = require('./parts/Ask');

var Audience = React.createClass({  

  render: function() {

    return(
      <Display if={this.props.status == 'connected'}>

        <Display if={this.props.member.name}>
          <Display if={this.props.currentQuestion && !this.props.currentAnswer}>
            <Ask question={this.props.currentQuestion} answer={this.props.answer}/>
          </Display>

          <Display if={!this.props.currentQuestion}>
            <h4>The question will be displayed here.</h4>
          </Display>
          <p>Connected users: {this.props.audience.length}</p>
        </Display>

        <Display if={!this.props.member.name}>
          <JoinForm emit={this.props.emit}/>
        </Display>

        <h2>Audience sida!{this.props.status}</h2>
      </Display>
    )
  }
});

module.exports = Audience;