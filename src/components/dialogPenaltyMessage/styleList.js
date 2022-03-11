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
      backgroundColor: "#9FBAF9",
      color: "#F8FFF8",
      marginTop: theme.spacing(0.5),
      height: 35,
      '&:hover': {
        backgroundColor: '#789EF8',
        color: "#F8FFF8"
      },
    },
    letters : {
      fontSize: '0.9rem'
    }
    
  }));