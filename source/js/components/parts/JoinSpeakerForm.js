var React = require('react');

var JoinSpeakerForm = React.createClass({ 

  render: function() {
    return(
      <form action="javascript:void(0)" onSubmit={this.nameEntered}>
        <label> Name: </label>
        <input type="text" placeholder="Type your name" ref="nameInput" className='form-control' required />
        <label> Title: </label>
        <input type="text" placeholder="Type your title" ref="titleInput" className='form-control' required />
        <button className="btn btn-primary"> Start </button>
      </form>
    )
  },

  nameEntered: function(){
    var name = this.refs.nameInput.value;
    var title = this.refs.titleInput.value;

    sessionStorage.title = title;

    this.props.emit("start", {
      speaker: {
        name: name
      },
      title: title
    });
  }
});

module.exports = JoinSpeakerForm;