import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 680,
    },
    rootTextfield: {
      width: '100%'
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    buttonEnable: {
      background: "#bbeebb",
      color: "#454845 ",
      margin: theme.spacing(0.5),
      
      '&:hover': {
        backgroundColor: '#65EA75',
        color: "#F6FFF6"
      },
      [theme.breakpoints.down("md")]: {
        minWidth: 100,
        fontSize: '0.6rem'
      },
      [theme.breakpoints.up("md")]: {
        minWidth: 135,
        fontSize: '0.8rem'
      },
      
    },
    buttonDisable: {
      margin: theme.spacing(0.5),
   
      backgroundColor: "#F99F9F ",
      '&:hover': {
        backgroundColor: "#EE4F4F ",
      },
      [theme.breakpoints.down("md")]: {
        minWidth: 100,
        fontSize: '0.6rem'
      },
      [theme.breakpoints.up("md")]: {
        minWidth: 135,
        fontSize: '0.8rem'
      },
      
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    buttonNotification: {
      background: "#E3E7E6",
      color: "#454845 ",
      margin: theme.spacing(0.5),
      [theme.breakpoints.down("md")]: {
        minWidth: 100,
        fontSize: '0.6rem'
      },
      [theme.breakpoints.up("md")]: {
        minWidth: 135,
        fontSize: '0.8rem'
      },
      
      '&:hover': {
        backgroundColor: '#5E8EA2',
        color: "#F6FFF6"
      },
    },
    
  }));