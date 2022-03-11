import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      justifyContent: "center",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 35,
  },
  autocompleteEmail:{
  
    
    [theme.breakpoints.down("md")]: {
      width: "100%"
    },
    [theme.breakpoints.up("md")]: {
      width: "100%"
    },
  },
  inputEmail:{
   
    
    [theme.breakpoints.down("md")]: {
      width: 398
    },
    [theme.breakpoints.up("md")]: {
      width: 170,
    },
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    [theme.breakpoints.down("sm")]: {
      height: 150,
      width: 150,
    },
    [theme.breakpoints.up("md")]: {
      height: 250,
      width: 250,
    },
  },
  button: {
    margin: theme.spacing(1),
    marginLeft: 6,
    [theme.breakpoints.down("sm")]: {
      width: 250,
    },
    [theme.breakpoints.up("md")]: {
      width: 410,
    },

    height: 50,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3DB310",
  },
  input: {
    display: "none",
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  rootAlert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  password: {
    margin: theme.spacing(1),
    "& legend": {
      visibility: "visible"
    },
    minHeight: 80,
    maxWidth: "80%"
  }
}));
