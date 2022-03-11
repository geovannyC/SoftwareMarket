import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 680,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    buttonEnable: {
      background: "#E3E7E6",
      color: "#454845 ",
      marginTop: theme.spacing(0.5),
      height: 35,
      '&:hover': {
        backgroundColor: '#429542',
        color: "#F6FFF6"
      },
    },
    buttonDisable: {
      background: "#E3E7E6",
      color: "#454845 ",
      marginTop: theme.spacing(0.5),
      height: 35,
      '&:hover': {
        backgroundColor: '#A7605C',
        color: "#F6FFF6"
      },
    },
    letters : {
      fontSize: '0.9rem'
    }
  }));