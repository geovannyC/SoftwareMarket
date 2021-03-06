import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    inputEmail:{
      "& legend": {
        visibility: "visible"
      },
      marginTop: theme.spacing(2),
    },
    autocompleteEmail:{
      marginTop: theme.spacing(2),
      width: "100%",
      alignContent: 'flex-end',
   
      // [theme.breakpoints.down("md")]: {
      //   width: 398
      // },
      // [theme.breakpoints.up("md")]: {
      //   width: 170,
      // },
    },
    test:{
      background: "black"
    },
    label: {
      backgroundColor: "black"
    },
    password: {
      marginTop: theme.spacing(2),
      "& legend": {
        visibility: "visible"
      }
    }
  }));