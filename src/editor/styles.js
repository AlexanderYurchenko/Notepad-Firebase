const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: '300px',
      boxShadow: '0 0 2px black'
    },
    titleInput: {
      height: '50px',
      boxSizing: 'border-box',
      border: 'none',
      padding: '5px',
      fontSize: '24px',
      width: '100%',
      backgroundColor: '#29487d',
      color: 'white',
      paddingLeft: '50px',
      marginBottom: '20px'
    },
    editIcon: {
      position: 'absolute',
      left: '332px',
      top: '33px',
      color: 'white',
      width: '10',
      height: '10'
    },
    editorContainer: {
      height: '100%',
      boxSizing: 'border-box',
      margin: '0 0 0 300px',
      padding: '20px'
    }
  });

  export default styles;