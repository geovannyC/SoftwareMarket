import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    
  },
  title: {
    fontSize: 13,
    padding: theme.spacing(1),
    height: 25,
    width: 280,
  },
  paper: {
    padding: theme.spacing(1),
    margin: "auto",

    [theme.breakpoints.down("sm")]: {
      maxWidth: 280,
      Height: 300,
      maxHeight: 300,
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 280,
      Height: 250,
      maxHeight: 250,
    },
  },
  image: {
    marginTop: 10,
    width: 128,
    height: 128,
    backgroundColor: "black",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  rootGrid: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(1),
  },
  dialog: {
    [theme.breakpoints.down("sm")]: {
      width: 280,
    
    },
    [theme.breakpoints.up("md")]: {
      width: 480,
  
    },
  },
  designInput: {
    minWidth: 255,
    [theme.breakpoints.down("sm")]: {
      width: 255,
  
    },
    [theme.breakpoints.up("md")]: {
      width: 400,

    },
  },
  boton: {
    marginTop: 10,
  },
}));
