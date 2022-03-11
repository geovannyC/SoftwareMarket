import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: "#E6F9FF",
  },
  imageList: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  imageContendDeleted: {
    maxWidth: "45%",
    maxHeight: "25"
  },
  content: {
    textAlign: "justify",
  },
  gridReport: {
    marginTop: theme.spacing(0.5),
    
    [theme.breakpoints.down('md')]: {
      maxWidth: "100%",
       },
      [theme.breakpoints.up('md')]: {
        maxWidth: "35%",
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: "40%",
      },
  },
  image: {
    position: "relative",
    height: "80%",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: "30%",
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.1,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdropReport: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.2,
    transition: theme.transitions.create("opacity"),
  },
  imageMarkedReport: {
    height: 3,
    width: 18,
    backgroundColor: "#EE6A6A ",
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageReportButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#EE6A6A ",
  },
  focusVisible: {},
  buttons: {
    alignContent: "fkex-end",
    textAlign: "right",
    margin: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  descriptionPreview: {
    marginTop: 5,
    [theme.breakpoints.up("md")]: {
      width: 480,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: 400,
      fontSize: 10,
      maxHeight: 380,
    },
  },
  gridImage: {
    width: 350,
  },
  gridInformation: {
    maxWidth: "100%",
    // [theme.breakpoints.down('md')]: {
    //     width: 320
    //    },
    //   [theme.breakpoints.up('md')]: {
    //    width: 240
    //   },
    //   [theme.breakpoints.up('lg')]: {
    //     width: 360
    //   },
  },
  gridDescription: {
    width: "100%",
  },
  dialogList: {
    maxWidth: "xl",
    width: 1200,
  },
}));
