import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Publicacion from "../schemmaPublication/shemmaPublication";
import { useStyles } from "./stylePublicationList";
export default function PublicationsList(props) {
  const classes = useStyles();
  const GridPublications = () => {
    console.log(props)
    if (props.dataList === "no hay publicaciones activas" || !props.dataList) {
      return <Typography>No hay publicaciones Activas</Typography>;
    } else {
      return (
        <div className={classes.root}>
          <Grid container spacing={2} alignItems="center" justify="center">
            {props.dataList.map((content) => {
              if (
                content.usuario.estado === "Inhabilitada" ||
                content.estadopublicacion === "Pendiente" ||
                content.estadopublicacion === "Inhabilitada" ||
                content.usuario.estado === "Pendiente"
              ) {
                return null;
              } else {
                let ranting = String;
                if (
                  content.calificacion.length === 0 ||
                  content.calificacion === null ||
                  content.calificacion === "Pendiente"
                ) {
                  ranting = 1;
                } else {
                  let sum = content.calificacion.reduce(
                    (previous, current) => (current += previous)
                  );
                  let avg = sum / content.calificacion.length;
                  ranting = Math.round(avg);
                }
                return (
                  <Grid item>
                    <Publicacion
                      contenido={content}
                      calificacion={ranting}
                      key={content._id}
                    />
                  </Grid>
                );
              }
            })}
          </Grid>
        </div>
      );
    }
  };

  return <GridPublications />;
}
