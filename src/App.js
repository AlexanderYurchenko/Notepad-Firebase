import React from 'react';
import { connect } from "react-redux";
import { selectNote } from "./js/actions/index";
import './App.css';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';

const firebase = require('firebase');

const mapStateToProps = state => {
  // console.log(state);
  return { 
    selectedNoteIndex: state.selectedNoteIndex,
    selectedNote: state.selectedNote,
    notes: state.notes
  };
};

function mapDispatchToProps(dispatch) {
  return {
    selectNote: (selectedNoteIndex, selectedNote) => dispatch(selectNote([selectedNoteIndex, selectedNote]))
  };
}

class ConnectedApp extends React.Component {
  constructor() {
    super();
    // console.log(this);
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        // console.log(notes);
        this.setState({ notes: notes })
      });
    
      this.setState({
        selectedNoteIndex: this.props.selectedNoteIndex,
        selectedNote: this.props.selectedNote,
        // notes: this.props.notes
      })
      // console.log(this.state);
  }

  selectNote = (note, index) => {
    console.log(this.props.selectNote);
    // this.setState({ 
    //   selectedNoteIndex: index, 
    //   selectedNote: note
    // })  
    this.props.selectNote(index, note)
  }

  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    await this.setState({
      notes: [... this.state.notes, note]
    });
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex
    })
  }

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({
      notes: this.state.notes.filter(_note => _note !== note)
    })
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({ 
        selectedNote: null,
        selectedNoteIndex: null
      })
    } else if (this.state.selectedNoteIndex > noteIndex) {
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
      this.setState({
        selectedNote: null,
        selectedNoteIndex: null
      })
    } 

    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }

  render() { 
    return (
      <div className="app-container">
        <SidebarComponent 
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        ></SidebarComponent>
        {
          this.state.selectedNote ?
          <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
          ></EditorComponent>
          : null
        }
      </div>
    );
  }

  
};

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);
 
export default App;
