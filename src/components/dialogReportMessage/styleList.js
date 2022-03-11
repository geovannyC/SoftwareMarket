import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 680,
    },
  
    buttonNotification: {
      background: "#E3E7E6",
      color: "#454845 ",
      marginTop: theme.spacing(0.5),
      height: 35,
      '&:hover': {
        backgroundColor: '#5E8EA2',
        color: "#F6FFF6"
      },
    },
    letters : {
      fontSize: '0.9rem'
    }
    
  }));