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
      <input type="checkbox" onChange={this.handleCheck}/>{msg}
    </div>
  }
});
var Note = React.createClass({
  getInitialState: function(){
    return {editting: false}
  },
  componentDidMount: function(){
    var node = ReactDOM.findDOMNode(this);
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
//TODO validate this = current note
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
  nextId: function(){
    //every time we create a new note, we will be creating a unique id for the note
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  },
  componentWillMount: function(){
    //this function is populating our notes with JSON calls
    var self = this;
    if(this.props.count){
      $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
        this.props.count + "&start-with-lorem=1&callback=?", function(results){
          results[0].split('. ').forEach(function(sentence){
            self.add(sentence.substring(0,40));
          });
        });
    }
  },
  add: function(text){
    var arr = this.state.notes;
    arr.push({
      id: this.nextId(),
      note: text
    });
    this.setState({notes:arr});
    //TODO automatically edit
  },
  update: function(newText, i){
    var arr = this.state.notes;
    arr[i].note = newText;
    //TODO varidate that note is string
    //use arr as the new array state for notes
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
      <Note key={note.id} index={i}
      onChange={this.update} onRemove={this.remove}>{note.note}<Checkbox /></Note>

      </div>
    )
  },
  getInitialState: function(){
    //make an array to hold initial notes
    return {
      notes: [
      ]
    };
  },
  render: function(){
    //TODO save state of all notes to a file
    //this.state.notes.map calls on notes array
    //basically this is a for statement to iterate through the array
    return <div className="board">
      {this.state.notes.map(this.eachNote)}
      <button className="btn btn-sm glyphicon glyphicon-plus" onClick={this.add.bind(null, "New Note")} />
    </div>
  }
});
  //you need to use reactDOM rather than react as of v0.14
  //http://stackoverflow.com/questions/26627665/error-with-basic-react-example-uncaught-typeerror-undefined-is-not-a-function
  ReactDOM.render(<Board count={50} />,
    document.getElementById('react-container'));
