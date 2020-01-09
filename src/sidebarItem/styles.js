const styles = theme => ({
    listItem: {
      cursor: 'pointer',
      position: 'relative'
    },
    textSection: {
      position: 'relative',
      
      maxWidth: '85%'
    },  
    deleteIcon: {
      position: 'absolute',
      right: '5px',
      top: 'calc(50% - 15px)',
      zIndex: '3',
      '&:hover': {
        color: 'red'
      }
    },
    underlay: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      zIndex: '2'
    }
  });
  
  export default styles;