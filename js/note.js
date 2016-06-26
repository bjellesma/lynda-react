//The following is JSX (JavaScript as XML)
//Notice how react uses it down below
//NOTE: React variables must begin with uppercase
var Checkbox = React.createClass({
  getInitialState: function(){
    //unchecked by default
    return {checked: false}
  },
  handleCheck: function(){
    //help to toggle check on and off
    this.setState({checked: !this.state.checked})
  },
  render: function(){
    var msg;
    if (this.state.checked){
      msg = "Done!";
    } else {
      msg = "Still to do!";
    }
    return <div>
      <input type="checkbox" onChange={this.handleCheck}/>
      <p>{msg}</p>
    </div>
  }
});
var Note = React.createClass({
  edit: function(){
    alert('editing note')
  },
  remove: function(){
    alert('removing note')
  },
  render: function(){
    return <div className="note">
    <p>{this.props.children}</p>
      <span>
        <button onClick={this.edit}
          className="btn btn-primary glyphicon glyphicon-pencil"/>
        <button onClick={this.remove}
          className="btn btn-danger glyphicon glyphicon-trash"/>
      </span>
    </div>
  }
});
  //you need to use reactDOM rather than react as of v0.14
  //http://stackoverflow.com/questions/26627665/error-with-basic-react-example-uncaught-typeerror-undefined-is-not-a-function
  ReactDOM.render(<div>
                  <Note>I am a child</Note>
                  <Checkbox />
                  </div>,
    document.getElementById('react-container'));
