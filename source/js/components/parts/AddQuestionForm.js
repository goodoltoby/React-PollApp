var React = require('react');

var AddQuestionForm = React.createClass({
  
  render: function() {
    return(
      <form id="add-question-form" ref="add_question_form" action="javascript:void(0)" onSubmit={this.addedQuestion}>
        <label> Question: </label>
        <input type="text" placeholder="Type your question" ref="questionInput" className='form-control' />
        <label> Alternatives: </label>
        <p> A: </p> <input type="text" placeholder="Type an alternative" ref="aInput" className='form-control' />
        <p> B: </p> <input type="text" placeholder="Type an alternative" ref="bInput" className='form-control' />
        <p> C: </p> <input type="text" placeholder="Type an alternative" ref="cInput" className='form-control' />
        <p> D: </p> <input type="text" placeholder="Type an alternative" ref="dInput" className='form-control' />
        <button className="btn btn-primary"> Add question </button>
      </form>
    )
  },
  addedQuestion: function(){
    var q = this.refs['questionInput'];
    var a = this.refs['aInput'];
    var b = this.refs['bInput'];
    var c = this.refs['cInput'];
    var d = this.refs['dInput'];
    var question = [q, a, b, c, d];

    this.props.emit("add_question", {
      q: q.value,
      a: a.value,
      b: b.value,
      c: c.value,
      d: d.value
    });

    //reset the input-value after they get "emitted"
    for(var i = 0; i < question.length; i++){
      question[i].value = '';
    }
  }
});

module.exports = AddQuestionForm;