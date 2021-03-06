import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebarItem/sidebarItem';

class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      addingNote: false
    };
  }

  newNoteBtnClick = () => {
    this.setState({
      title: null,
      addingNote: !this.state.addingNote
    })
  }

  updateTitle = (txt) => {
    this.setState({
      title: txt
    });
  }

  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({
      title: null,
      addingNote: false
    })
  }

  selectNote = (note, index) => {
    this.props.selectNote(note, index);
  }

  deleteNote = (note) => {
    this.props.deleteNote(note);
  }

  render() {
    const { notes, classes, selectedNoteIndex } = this.props;

    if (notes) {
      return (
        <div className={classes.sidebarContainer}>
          <Button
            onClick={this.newNoteBtnClick}
            className={classes.newNoteBtn}>{this.state.addingNote ? 'Cancel' : 'New note'}
          </Button>
          {
            this.state.addingNote ?
              <form>
                <input type="text"
                  className={classes.newNoteInput}
                  autoFocus='autofocus'
                  placeholder="Enter note title"
                  onKeyUp={(event) => this.updateTitle(event.target.value)}>
                </input>
                <Button
                  type="submit"
                  className={classes.newNoteSubmitBtn}
                  onClick={this.newNote}>Submit
                </Button>
              </form> :
            null
          }
          <List>
            {
              notes.map((_note, _index) => {
                return(
                  <div key={_index}>
                    <SidebarItemComponent
                      _note={_note}
                      _index={_index}
                      selectedNoteIndex={selectedNoteIndex}
                      selectNote={this.selectNote}
                      deleteNote={this.deleteNote}>
                    </SidebarItemComponent>
                    <Divider></Divider>
                  </div>
                )
              })
            }
          </List>
        </div>
      );
    } else {
      return <div>Add a note!</div>
    }
  }
}

export default withStyles(styles)(SidebarComponent);