import React from 'react';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import './styles.css';

class EditorComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      title: null,
      id: ''
    }
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
    this.update();
  };

  componentDidMount = () => {
    const blocksFromHTML = convertFromHTML(this.props.selectedNote.body);
    const content = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
    this.setState({
      editorState: EditorState.createWithContent(content),
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id
    })
  };

  componentDidUpdate = () => {
    if (this.props.selectedNote.id !== this.state.id) {
      const blocksFromHTML = convertFromHTML(this.props.selectedNote.body);
      const content = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );
      this.setState({
        editorState: EditorState.createWithContent(content),
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      })
    }
  };

  updateTitle = async (txt) => {
    await this.setState({
      title: txt
    });
    this.update();
  }

  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    });
  }, 1500);

  render() {
    const { classes } = this.props;
    const { editorState, title } = this.state;
    return (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
        <input className={classes.titleInput}
          placeholder='Note title'
          value={title ? title : ''}
          onChange={(e) => this.updateTitle(e.target.value)}/>
        <Editor
          wrapperClassName="DraftWrapper"
          editorClassName="DraftEditor"
          toolbarClassName="DraftToolbar"
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

export default withStyles(styles)(EditorComponent);