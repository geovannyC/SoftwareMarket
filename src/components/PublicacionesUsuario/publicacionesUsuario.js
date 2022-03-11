import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useStyles } from "./stylePublications";
import AlertDialog from "./dialogPublication";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AlertEmpty from "../AlertEmpty/alertEmpty";
import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";
import cx from "clsx";

import dataUsr from "../../util/POSTTOK";

export default function RecipeReviewCard() {
  const [data, setData] = React.useState([]),
    [loading, setLoading] = React.useState(true),
    [alertempty, setAlertEmpty] = React.useState(false);
  const classes = useStyles();
  const shadowStyles = useSoftRiseShadowStyles();
  useEffect(() => {
    const url = '/datausr'
    const datos = JSON.stringify({
      _id: localStorage.getItem("id"),
    });

    dataUsr(datos, url)
      .then((contenido) => {
        if (!contenido) {
          setData("No tienes publicaciones");
          setLoading(false);
          setAlertEmpty(true);
        } else {
          setData(contenido);
          setLoading(false);
        }
      })
      .catch((err) => alert(err));
  }, []);
  const handleAlertEmpty = () => {
    if (alertempty) {
      setAlertEmpty(false);
      window.location.reload();
    } else {
      setAlertEmpty(true);
    }
  };
  const AlertEmpyData = () => {
    const tittle = 'No tienes publicaciones activas'
    const subtitle = 'Crea tu primera publicación dando clic en "Publicar"'
    const cardButton = 'inicio'
    return (
      <AlertEmpty tittle={tittle} subtitle={subtitle} cardButton={cardButton}/>
    )
  };

  const CardPreview = (props) => {
    return (
      <div className={cx(classes.root, shadowStyles.root)}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Typography gutterBottom className={classes.title}>
              {props.dataPublicacion.nombreproducto}
            </Typography>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src={props.dataPublicacion.idimagen}
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={1}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    {props.dataPublicacion.empresa}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {props.dataPublicacion.ciudad}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{`$ ${props.dataPublicacion.precio}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <AlertDialog data={props.dataPublicacion} />
        </Paper>
      </div>
    );
  };
  if (loading) {
    return <Typography>Cargando...</Typography>;
  } else {
    if (data === "No tienes publicaciones") {
      return <AlertEmpyData />;
    } else {
      return (
        <div>
          <Grid container className={classes.rootGrid} spacing={1}>
            <Grid item xs={12}>
              <Grid container justify="center">
                {data.map((publicacion) => {
                  return (
                    <CardPreview
                      dataPublicacion={publicacion}
                      key={publicacion._id}
                    />
                  );
                })}
                <Grid item></Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}
