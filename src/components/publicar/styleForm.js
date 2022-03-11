import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootForm: {
    "& > *": {
      margin: theme.spacing(0.5),
      width: "38.7ch",
    },
  },
  collapsemd: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  collapseButton: {
    [theme.breakpoints.down("sm")]: {
      backgroundColor: green,
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  collapseImage: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    width: 330,
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginLeft: 12,
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  paper: {
    width: 400,
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      height: 1100,
    },
    [theme.breakpoints.up("md")]: {
      height: 860,
    },
    [theme.breakpoints.up("lg")]: {
      height: 860,
    },
  },
  paperStandard: {
    width: 400,
    height: 860,
  },
  control: {
    padding: theme.spacing(1),
  },
  filas: {
    padding: theme.spacing(1),
  },
  title: {
    fontSize: 30,
    padding: theme.spacing(1),
  },
  pos: {
    width: 330,
    maxheight: 300,
    padding: theme.spacing(1),
    aling: "justify",
    color: "black",
  },
  image: {
    height: 200,
    maxWidth: 180,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    width: "auto",
    maxWidth: 325,
    marginLeft: 8,
    padding: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  button: {
    marginTop: 10,
  },
  preview: {
    width: 400,
  },
}));
