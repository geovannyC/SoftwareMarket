import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  rootCard: {
    marginTop: 15,
    maxWidth: 250,
    height: 460,
    borderRadius: 8,
    padding: 12,
    margin: theme.spacing(0.5),
    cursor: "pointer",
  },
  rootCardPreview: {
    maxWidth: "xl",
    [theme.breakpoints.up("md")]: {
      height: "100%",
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: "100%",
    },
  },
  entreprice:{
    display: "flex",
  },
  media: {
    [theme.breakpoints.up("md")]: {
      height: 190,
    },
    [theme.breakpoints.down("sm")]: {
      height: 100,
    },
  },

  card: {
    display: "flex",
    width: 10,
    height: 18,
    margin: theme.spacing(1),
  },
  imageP: {
    display: "flex",
    width: 18,
    height: 18,
  },
  imageCheck: {
    textAlign: "center",
    content: "center",
    width: 10,
    height: 10,
  },
  titleS: {
    fontSize: 14,
    height: 15,
    width: 200,
    textAlign: "center",
  },
  titleM: {
    fontSize: 18,
    height: 15,
    width: 200,
    textAlign: "center",
  },
  description: {
    marginTop: 10,
    fontSize: 13,
    height: 10,
    width: 230,
  },
  descriptionPreview: {
    marginTop: 5,
    [theme.breakpoints.up("md")]: {
      width: 580,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: 600,
      fontSize: 10,
      maxHeight: 380,
    },
  },
  price: {
    marginTop: 5,
    [theme.breakpoints.up("md")]: {
      fontSize: 20,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
    },
  },
  titlepreview: {
    [theme.breakpoints.up("md")]: {
      fontSize: 25,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
}));
