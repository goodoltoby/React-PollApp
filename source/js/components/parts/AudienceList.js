var React = require('react');

var AudienceList = React.createClass({
  render: function(){

    var tableRows = this.props.audience.map((member, i) => {
      return(
        <tr key={i}>
          <td>{member.name}</td>
          <td>{member.id}</td>
        </tr>
      )
    });

    return(
      <div>
        <h2>Connected users</h2>
        <table className="table table-stripped">
          <thead>
            <tr>
              <th>Name:</th>
              <th>Socket ID:</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    )
  }
})

module.exports = AudienceList;