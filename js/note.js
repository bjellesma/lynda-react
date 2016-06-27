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
  getInitialState: function(){
    return {editting: false}
  },
  edit: function(){
    this.setState({editing: true});
  },
  save: function(){
    //get the ref attribute of the node being used
    var ref = ReactDOM.findDOMNode(this.refs.newText).value;
    alert("Value of note is now " + ref);
    this.setState({editing: false});
  },
  remove: function(){
    alert('removing note')
  },
  renderDisplay: function(){
    return <div className="note">
    <p>{this.props.children}</p>
      <span>
        <button onClick={this.edit}
          className="btn btn-primary glyphicon glyphicon-pencil"/>
        <button onClick={this.remove}
          className="btn btn-danger glyphicon glyphicon-trash"/>
      </span>
    </div>
  },
  renderForm: function(){
    return (
      <div className="note">
      <textarea ref="newText" defaultValue={this.props.children}
      className="form-control"></textarea>
      <button onClick={this.save} className="bin btn-success btn-sm glyphicon glyphicon-floppy-disk" />
      </div>
    )
  },
  render: function(){
    if (this.state.editing){
      return this.renderForm();
    }else{
      return this.renderDisplay();
    }
  }
});
  //you need to use reactDOM rather than react as of v0.14
  //http://stackoverflow.com/questions/26627665/error-with-basic-react-example-uncaught-typeerror-undefined-is-not-a-function
  ReactDOM.render(<div>
                  <Note>I am a child</Note>
                  <Checkbox />
                  </div>,
    document.getElementById('react-container'));
