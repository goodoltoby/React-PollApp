var React = require('react');
var Display = require('./parts/Display');
var JoinSpeakerForm = require('./parts/JoinSpeakerForm');
var AddQuestionForm = require('./parts/AddQuestionForm');
var AudienceList = require('./parts/AudienceList');
var QuestionsList = require('./parts/QuestionsList');

var Speakers = React.createClass({  

  render: function() {

    return(
      <Display if={this.props.status === 'connected'}>
        <Display if={this.props.member.type === 'speaker'}>
          <QuestionsList questions={this.props.questions} emit={this.props.emit} />
          <AudienceList audience={this.props.audience} />
        </Display>

        <Display if={this.props.member.type !== 'speaker'}>
          <JoinSpeakerForm emit={this.props.emit} />
        </Display>
        <Display if={this.props.member.type === 'speaker'}>
          <AddQuestionForm emit={this.props.emit} />
        </Display>   
      </Display>
    )
  }
});

module.exports = Speakers;