var React = require("react");
var io = require('socket.io-client');
var Header = require('./parts/Header');
var Link = require('react-router').Link;

var PollApp = React.createClass({

  getInitialState(){
    return{
      status: 'disconnected',
      title: '',
      member: {},
      audience: [],
      speaker: '',
      questions: [],
      currentQuestion: null,
      currentAnswer: null,
      results: {
        a:0,
        b:0,
        c:0,
        d:0
      }
    }
  },

  componentWillMount: function () {
    this.socket = io(/*"http://localhost:3000/"*/);

    this.socket.on('connect', () => {
      this.setState({status: 'connected'});
      console.log("Connected to websocket");
    }).on('disconnect', () => {
      this.setState({status: 'disconnected'});
      console.log("Disconnected from websocket");
    }).on('welcome', (info) => {
      this.setState(info);

      if(sessionStorage.member){
        var member = JSON.parse(sessionStorage.member);

        if(member.type === 'audience'){
          this.socket.emit('join', {
            member: member
          });
        }else if(member.type === 'speaker'){
          this.socket.emit('start', {
            speaker: member,
            title: sessionStorage.title
          });
        }
      }
    }).on('audience', (audienceArr) => {
      this.setState({audience: audienceArr});
    }).on('joined', (member) => {
      this.setState({member: member});
      sessionStorage.member = JSON.stringify(member);
    }).on('started', (info) => {
      this.setState(info);
    }).on('add_question', (question) => {
      this.setState(question);
    }).on('ask', (question) => {
      this.setState({
        currentQuestion: question,
        currentAnswer: null,
        results: {a:0, b:0, c:0, d:0}
      });
    }).on('results', (result) => {
      this.setState({
        results: result
      });
    });
  },

  onEmit: function(msg, payload){
    //this.setState(payload);
    this.socket.emit(msg, payload);
    //alert('pollApp - onEmit!');
  },

  answer: function(optionName){
    //alert(optionName);
    this.setState({
      currentAnswer: optionName
    });
    this.socket.emit('answer', optionName);
  },

  render: function () {
    //console.log(this.state.questions);
    var propObj = jQuery.extend({
      emit: this.onEmit,
      answer: this.answer
    }, this.state);

    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li><Link to="/">Audience</Link></li>
              <li><Link to="/speaker">Speaker</Link></li>
              <li><Link to="/board">Board</Link></li>
            </ul>
          </div>
        </nav>

        <Header title={this.state.title} status={this.state.status} speaker={this.state.speaker} />
        {React.cloneElement(this.props.children, propObj)}


        <footer>
          {/*<p><a href="https://github.com/goodoltoby">goodoltoby @ gihub</a></p>*/}
          <p>THIS IS LE FOOTER</p>
        </footer>
      </div>
    )
  }
});

module.exports = PollApp;