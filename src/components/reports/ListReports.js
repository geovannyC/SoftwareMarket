import React, { useEffect, useCallback } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useStyles } from "./styleList";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import DialogPenaltyMesaage from "../dialogPenaltyMessage/dialogPenaltyMessage";

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
  const handleChange = (event, nextView) => {
    setView(nextView);
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
  const AlertUpdate = () => {
    if (!alert) {
      return null;
    } else if (alert === "loading") {
      return (
        <div className={classes.rootAlert}>
          <Alert variant="filled" severity="warning">
            Actualizando...
          </Alert>
        </div>
      );
    } else if (alert === "success") {
      return (
        <div className={classes.rootAlert}>
          <Alert variant="filled" severity="success">
            {`${dataState} con éxito`}
          </Alert>
        </div>
      );
    } else if (alert === "error al actualizar") {
      return (
        <div className={classes.rootAlert}>
          <Alert variant="filled" severity="error">
            Error al actualizar, intentalo mas tarde
          </Alert>
        </div>
      );
    }
  };
  if (loading) {
    return <Typography>Cargando</Typography>;
  }
  if (data === "no hay usuarios activos") {
    return <Typography>No hay usuarios activos</Typography>;
  } else {
    return (
      <>
        <AlertUpdate />
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
                            primary={`Nombre: ${item.nombre}  ${item.apellido} `}
                            secondary={
                              <>
                                <Typography component="span" variant="body2">
                                  {`Correo: ${item.correo}`}
                                </Typography>
                                <br></br>
                                {`Cédula: ${item.cedula}`}
                                <br></br>
                                {`Telefono ${item.telefono}`}
                              </>
                            }
                          />

                          <ToggleButtonGroup
                            orientation="vertical"
                            value={view}
                            exclusive
                            onChange={handleChange}
                          >
                            {sectionId !== "Usuario_Habilitado" ? (
                              <>
                                <ToggleButton
                                  value={`${sectionId}${item}opcion1`}
                                  aria-label="list"
                                  className={classes.buttonEnable}
                                  onClick={() =>
                                    setUpdateUser(
                                      item._id,
                                      "Usuario_Habilitado"
                                    )
                                  }
                                >
                                  <Typography className={classes.letters}>
                                    Habilitar
                                  </Typography>
                                </ToggleButton>
                                {sectionId !== "Por_Revisar" ? (
                                  <DialogPenaltyMesaage
                                    data={`${item.nombre} ${item.apellido}`}
                                    datauser={item.correo}
                                    sendNotification={() =>
                                      messageStatusNotification()
                                    }
                                  />
                                ) : null}
                              </>
                            ) : null}

                            {sectionId !== "Usuario_Inhabilitado" ? (
                              <>
                                <ToggleButton
                                  children
                                  value={`${sectionId}${item}opcion2`}
                                  aria-label="module"
                                  className={classes.buttonDisable}
                                  onClick={() =>
                                    setUpdateUser(
                                      item._id,
                                      "Usuario_Inhabilitado"
                                    )
                                  }
                                >
                                  <Typography className={classes.letters}>
                                    Inhabilitar
                                  </Typography>
                                </ToggleButton>
                              </>
                            ) : null}
                          </ToggleButtonGroup>
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
