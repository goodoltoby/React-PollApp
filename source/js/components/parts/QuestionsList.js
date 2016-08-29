var React = require('react');

var QuestionList = React.createClass({
  ask: function(question){
    //console.log(question);
    this.props.emit('ask', question);
  },
  render: function(){
    //console.log(this.props.questions);
    var multiQuestions = this.props.questions.map((question, i) =>{
      return(
        <li key={i}><a href='#' onClick={this.ask.bind(this, question)}>{question.q}</a></li>
      );
    });

    return(
      <div>
        <h4>Frågor: {this.props.questions.length}</h4>
        <ul>
          {multiQuestions}
        </ul>
      </div>
    );
  }
});

module.exports = QuestionList;