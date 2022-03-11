import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useStyles } from "./styleList";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Typography } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import DialogPenaltyMesaage from "../dialogPenaltyMessage/dialogPenaltyMessage";
import ReportNotification from "../ReportNotification/reportNotification";
import getData from "../../util/GETTOK";
import estadoPublicacion from "../../util/POSTTOK";
import usuarios from "../../util/GETTOK";

const yellow = "#ffffbf";
const green = "#bbeebb";
const red = "#FF6961";
const theme = createTheme();
theme.typography.h3 = {
  fontSize: "0.7rem",
  "@media (min-width:600px)": {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
};
export default function AdminPublicaciones() {
  const classes = useStyles();
  const [data, setData] = useState(null),
    [users, setUsers] = useState(null),
    [loading, setLoading] = useState(true),
    [alert, setAlert] = useState(false);
  useEffect(() => {
    fullDataUsers();
    fullData();
  }, []);

  const fullData = async () => {
    const url = "/publicaciones";
    await getData(url)
      .then((data) => {
        return data;
      })
      .then(async (result) => {
        if (result) {
          let cont = result.sort();
          await setData(cont.reverse());
        }
      });
  };
  const fullDataUsers = async () => {
    await usuarios("/usuarios")
      .then((result) => {
        return result;
      })
      .then((result) => {
        if (result) {
          let cont = result.sort();

          setUsers(cont.reverse());
        }
      });
    setLoading(false);
  };
  const updateStateFn = async (id, mensaje) => {
    setAlert("loading");
    const data = JSON.stringify({
      estadopublicacion: mensaje,
      _id: id,
    });
    const url = "/estadopublicacion";
    await estadoPublicacion(data, url).then((data) => {
      if (data) {
        fullData();
        fullDataUsers();
        setAlert("success");
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      } else {
        setAlert("error al actualizar");
      }
    });
  };

  const color = (x) => {
    if (x === "Pendiente") {
      return yellow;
    } else if (x === "Habilitada") {
      return green;
    } else if (x === "Inhabilitada") {
      return red;
    }
  };
  const messageStatusNotification = () => {
    setAlert("success");
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  const ButtonEnable = (props) => {
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.buttonEnable}
        onClick={() => updateStateFn(props.id, props.status)}
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
        onClick={() => updateStateFn(props.id, props.status)}
      >
        Deshabilitar
      </Button>
    );
  };
  const SchemmaList = () => {
    return (
      <div>
        <ReportNotification notification={alert} />
        <List className={classes.root} subheader={<li />}>
          {["Pendiente", "Habilitada", "Inhabilitada"].map((sectionId) => (
            <li key={`section-${sectionId}`} className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader
                  style={{ background: color(sectionId) }}
                >{`Sección ${sectionId}`}</ListSubheader>
                {data === null
                  ? null
                  : data.map((item) => {
                      const usuario = users.find(
                        (usuarios) => usuarios._id === item.usuario._id
                      );
                      if (item.estadopublicacion === sectionId) {
                        return (
                          <ListItem alignItems="flex-start" key={item._id}>
                            <ListItemAvatar>
                              <Avatar alt="Remy Sharp" src={item.idimagen} />
                            </ListItemAvatar>
                            <ListItemText
                              secondary={
                                <React.Fragment>
                                  <Card
                                    className={classes.root}
                                    variant="outlined"
                                  >
                                    <CardContent>
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} sm container>
                                          <Grid item xs>
                                            <Typography>
                                              {item.nombreproducto}
                                            </Typography>
                                          </Grid>
                                          <Grid item>
                                            {sectionId === "Habilitada" ? (
                                              <Grid item>
                                                <ButtonDisable
                                                  id={item._id}
                                                  status={"Inhabilitada"}
                                                />
                                              </Grid>
                                            ) : sectionId === "Inhabilitada" ? (
                                              <>
                                                <Grid item>
                                                  <ButtonEnable
                                                    id={item._id}
                                                    status={"Habilitada"}
                                                  />
                                                </Grid>
                                                <Grid item>
                                                  <ButtonNotification
                                                    name={item.nombreproducto}
                                                    datauser={usuario.correo}
                                                  />
                                                </Grid>
                                              </>
                                            ) : sectionId === "Pendiente" ? (
                                              <>
                                                <Grid item>
                                                  <ButtonEnable
                                                    id={item._id}
                                                    status={"Habilitada"}
                                                  />
                                                </Grid>
                                                <Grid item>
                                                  <ButtonDisable
                                                    id={item._id}
                                                    status={"Inhabilitada"}
                                                  />
                                                </Grid>
                                              </>
                                            ) : null}
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Typography
                                        component="span"
                                        variant="body2"
                                      >
                                        {` Nombre del usuario: ${usuario.nombre} ${usuario.apellido}`}
                                        <br></br>
                                        {`Precio: $${item.precio}`}
                                      </Typography>
                                      <br></br>
                                      {` Empresa: ${item.empresa}`}
                                      <br></br>
                                      {`Ciudad: ${item.ciudad}`}
                                      <br></br>
                                      {`Telefono del usuario: ${usuario.telefono}`}
                                      <br></br>
                                      {`Cédula del usuario: ${usuario.cedula}`}
                                      <br></br>
                                      {`Correo del usuario: ${usuario.correo}`}
                                      <br></br>
                                      {`Estado del usuario: ${usuario.estado}`}
                                      <br></br>
                                      {`Estado de la publicación: ${item.estadopublicacion}`}
                                      <br></br>
                                    </CardContent>
                                  </Card>
                                  <Accordion>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                    >
                                      <Typography className={classes.heading}>
                                        <h2>{`Descripción`}</h2>
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      {item.descripcion}
                                    </AccordionDetails>
                                  </Accordion>
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
  };

  if (loading) {
    return <Typography>Cargando</Typography>;
  } else {
    return <SchemmaList />;
  }
}
