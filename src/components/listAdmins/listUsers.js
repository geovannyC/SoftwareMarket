import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useStyles } from "./styleList";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import usuarios from "../../util/GETTOK";
import estadoPublicacion from "../../util/POSTTOK";
import ReportNotification from "../ReportNotification/reportNotification";

const yellow = "#ffffbf";
const green = "#bbeebb";
const red = "#FF6961";

export default function ListAdmins() {
  const [data, setData] = useState(false),
    [loading, setLoading] = useState(true),
    [admin, setAdmin] = useState(false),
    [alert, setAlert] = useState(false);
  useEffect(() => {
    fullData();
  }, []);
  const fullData = () => {
    const url = "/usuarios";
    usuarios(url)
      .then((data) => {
        const currentUser = data.find(
          (value) => value._id === localStorage.getItem("id")
        );
        if (currentUser.estado === "SuperUsuario") {
          setAdmin(true);
          let arr = data;
          let index = data.indexOf(currentUser);
          delete arr[index];
          setData(arr);
        } else {
          setAdmin(false);
        }
        setLoading(false);
      })
      .catch((err) => alert(err));
  };
  const setUpdateUser = async (id, estado) => {
    setAlert("loading");
    const data = JSON.stringify({
      estado: estado,
      _id: id,
    });
    const url = "/actualizarusuario";
    await estadoPublicacion(data, url).then((response) => {
      if (response) {
        setAlert("success");
        fullData();
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      } else {
        setAlert("error al actualizar");
      }
    });
  };
  const color = (x) => {
    if (x === "SuperUsuario") {
      return green;
    } else if (x === "SuperUsuarioInhabilitado") {
      return red;
    }
  };
  const ButtonEnable = (props) => {
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.buttonEnable}
        onClick={() => setUpdateUser(props.id, props.status)}
      >
        Habilitar
      </Button>
    );
  };
  const ButtonDisable = (props) => {
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.buttonDisable}
        onClick={() => setUpdateUser(props.id, props.status)}
      >
        Deshabilitar
      </Button>
    );
  };
  const classes = useStyles();
  if (localStorage.getItem("id")) {
    if (!admin && data) {
      return window.location.reload();
    } else if (loading) {
      return <Typography>Cargando</Typography>;
    }
    if (data === "no hay usuarios activos") {
      return <Typography>No hay usuarios activos</Typography>;
    } else {
      return (
        <div>
          <ReportNotification notification={alert} />
          <List className={classes.root} subheader={<li />}>
            {["SuperUsuario", "SuperUsuarioInhabilitado"].map((sectionId) => (
              <li key={`section-${sectionId}`} className={classes.listSection}>
                <ul className={classes.ul}>
                  <ListSubheader
                    style={{ background: color(sectionId) }}
                  >{`Sección ${sectionId}`}</ListSubheader>
                  {data.map((item) => {
                    if (item.estado === sectionId) {
                      return (
                        <ListItem alignItems="flex-start" key={item._id}>
                          <ListItemText
                            secondary={
                              <React.Fragment>
                                <Card variant="outlined">
                                  <CardContent>
                                    <Grid container spacing={1}>
                                      <Grid item xs={12} sm container>
                                        <Grid item xs>
                                          <Typography
                                            component="span"
                                            variant="body2"
                                            color="white"
                                          >
                                            {`Usuario ${item.correo}`}
                                          </Typography>
                                        </Grid>
                                        <Grid item>
                                          {sectionId === "SuperUsuario" ? (
                                            <Grid item>
                                              <ButtonDisable
                                                id={item._id}
                                                status={
                                                  "SuperUsuarioInhabilitado"
                                                }
                                              />
                                            </Grid>
                                          ) : sectionId ===
                                            "SuperUsuarioInhabilitado" ? (
                                            <>
                                              <Grid item>
                                                <ButtonEnable
                                                  id={item._id}
                                                  status={"SuperUsuario"}
                                                />
                                              </Grid>
                                            </>
                                          ) : null}
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </CardContent>
                                </Card>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      );
                    }
                  })}
                </ul>
              </li>
            ))}
          </List>
        </div>
      );
    }
  } else {
    return (window.location.href = "http://localhost:3000");
  }
}
