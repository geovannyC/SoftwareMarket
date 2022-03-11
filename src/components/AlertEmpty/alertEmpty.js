import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import imageEmpty from "./empty.jpg";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  rootCardEmpty: {
    height: 200,
  },
});

export default function AlertEmpty(props) {
  const classes = useStyles();
  const CardAlertEmpty = () => {
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.rootCardEmpty}
            image={imageEmpty}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.tittle}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.subtitle}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.location.reload()}
          >
            {props.cardButton}
          </Button>
        </CardActions>
      </Card>
    );
  };
  return <CardAlertEmpty />;
}
