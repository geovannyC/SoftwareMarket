import React, { useEffect, useCallback } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useStyles } from "./styleList";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import DialogPenaltyMesaage from "../dialogPenaltyMessage/dialogPenaltyMessage";
import ReportNotification from "../ReportNotification/reportNotification";
import Button from "@material-ui/core/Button";

import usuarios from "../../util/GETTOK";
import estadoPublicacion from "../../util/POSTTOK";

const yellow = "#ffffbf";
const green = "#bbeebb";
const red = "#FF6961";

export default function ListUsers() {
  const [view, setView] = React.useState("list"),
    [data, setData] = React.useState(null),
    [loading, setLoading] = React.useState(true),
    [alert, setAlert] = React.useState(false),
    [dataState, setDataState] = React.useState(false);
  useEffect(() => {
    fullData();
  }, []);
  const fullData = useCallback(() => {
    usuarios("/usuarios")
      .then((data) => {
        if (data) {
          setData(data);
          setLoading(false);
        }
      })
      .catch((err) => alert(err));
  });

  const setUpdateUser = async (id, estado) => {
    const data = JSON.stringify({
      estado: estado,
      _id: id,
    });
    const url = "/actualizarusuario";
    await estadoPublicacion(data, url).then((response) => {
      if (response) {
        fullData();
        setAlert("success");
        setDataState(estado);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      } else {
        setAlert("error al actualizar");
      }
    });
  };
  const messageStatusNotification = () => {
    setDataState(`El usuario ha sido notificado `);
    setAlert("success");
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };
  const color = (x) => {
    if (x === "Por_Revisar") {
      return yellow;
    } else if (x === "Usuario_Habilitado") {
      return green;
    } else if (x === "Usuario_Inhabilitado") {
      return red;
    }
  };
  const classes = useStyles();
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
  const ButtonNotification = (props) => {
    return (
      <DialogPenaltyMesaage
        data={props.nombre}
        datauser={props.datauser}
        sendNotification={() => messageStatusNotification()}
      />
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
  if (loading) {
    return <Typography>Cargando</Typography>;
  }
  if (data === "no hay usuarios activos") {
    return <Typography>No hay usuarios activos</Typography>;
  } else {
    return (
      <>
        <ReportNotification notification={alert} />
        <List className={classes.root} subheader={<li />}>
          {["Por_Revisar", "Usuario_Habilitado", "Usuario_Inhabilitado"].map(
            (sectionId) => (
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
                                <Card
                                    
                                    variant="outlined"
                                  >
                                    <CardContent>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm container>
                                          <Grid item xs>
                                            <Typography>
                                            {`Nombre: ${item.nombre}  ${item.apellido} `}
                                            </Typography>
                                          </Grid>
                                          <Grid item>
                                            {sectionId === "Usuario_Habilitado" ? (
                                              <Grid item>
                                                <ButtonDisable
                                                  id={item._id}
                                                  status={"Usuario_Inhabilitado"}
                                                />
                                              </Grid>
                                            ) : sectionId === "Usuario_Inhabilitado" ? (
                                              <>
                                                <Grid item>
                                                  <ButtonEnable
                                                    id={item._id}
                                                    status={"Usuario_Habilitado"}
                                                  />
                                                </Grid>
                                                <Grid item>
                                                  <ButtonNotification
                                                    name={`Nombre: ${item.nombre}  ${item.apellido} `}
                                                    datauser={item.correo}
                                                  />
                                                </Grid>
                                              </>
                                            ) : sectionId === "Por_Revisar" ? (
                                              <>
                                                <Grid item>
                                                  <ButtonEnable
                                                    id={item._id}
                                                    status={"Usuario_Habilitado"}
                                                  />
                                                </Grid>
                                                <Grid item>
                                                  <ButtonDisable
                                                    id={item._id}
                                                    status={"Usuario_Inhabilitado"}
                                                  />
                                                </Grid>
                                              </>
                                            ) : null}
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <>
                                <Typography component="span" variant="body2">
                                  {`Correo: ${item.correo}`}
                                </Typography>
                                <br></br>
                                {`Cédula: ${item.cedula}`}
                                <br></br>
                                {`Telefono ${item.telefono}`}
                              </>
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
            )
          )}
        </List>
      </>
    );
  }
}
