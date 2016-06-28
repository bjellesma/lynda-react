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
    //whenever the onChange event is triggered
    this.props.onChange(ReactDOM.findDOMNode(this.refs.newText).value, this.props.index);
    this.setState({editing: false});
  },
  remove: function(){
    this.props.onRemove(this.props.index);
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

var Board = React.createClass({

  //object
  propTypes: {

    count: function(props, propName){
      var maxNoteCount = 100;
      if(typeof props[propName] !== "number"){
        return new Error("Error 01. The count property must be a number");
      }
      if(props[propName] > maxNoteCount){
        return new Error("Error 02. You have " + props[propName] + " notes which is more than the " + maxNoteCount + " allowed")
      }
    }
  },
  update: function(newText, i){
    var arr = this.state.notes;
    arr[i] = newText;
    //TODO varidate that note is string
    this.setState({note:arr});
  },
  remove: function(i){
    var arr = this.state.notes;
    arr.splice(i, 1);
    this.setState({notes:arr});
  },
  eachNote: function(note, i){
    return (
      <div className="note">
      <Note key={i} index={i}
      onChange={this.update} onRemove={this.remove}>{note}</Note>
      <Checkbox />
      </div>
    )
  },
  getInitialState: function(){
    //make an array to hold initial notes
    return {
      notes: [
        "Call Connie",
        "Email Doctor"
      ]
    };
  },
  render: function(){
    //this.state.notes.map calls on notes array
    //basically this is a for statement to iterate through the array
    return <div className="board">
      {this.state.notes.map(this.eachNote)}
    </div>
  }
});
  //you need to use reactDOM rather than react as of v0.14
  //http://stackoverflow.com/questions/26627665/error-with-basic-react-example-uncaught-typeerror-undefined-is-not-a-function
  ReactDOM.render(<Board count={10} />,
    document.getElementById('react-container'));
