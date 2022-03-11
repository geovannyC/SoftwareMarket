import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: "100%",
  },
  buttonBorder: {
    margin: theme.spacing(1),
  },
  rootTextfield: {
    width: "100%",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },

  buttonDisable: {
    margin: theme.spacing(0.5),
    [theme.breakpoints.down("md")]: {
      minWidth: 100,
      fontSize: "0.6rem",
    },
    [theme.breakpoints.up("md")]: {
      minWidth: 135,
      fontSize: "0.8rem",
    },
    backgroundColor: "#F99F9F ",
    "&:hover": {
      backgroundColor: "#EE4F4F ",
    },
  },
  buttonNotification: {
    background: "#E3E7E6",
    color: "#454845 ",
    margin: theme.spacing(0.5),
    [theme.breakpoints.down("md")]: {
      minWidth: 100,
      fontSize: "0.6rem",
    },
    [theme.breakpoints.up("md")]: {
      minWidth: 135,
      fontSize: "0.8rem",
    },
    "&:hover": {
      backgroundColor: "#5E8EA2",
      color: "#F6FFF6",
    },
  },
  letters: {
    fontSize: "0.9rem",
  },
}));
