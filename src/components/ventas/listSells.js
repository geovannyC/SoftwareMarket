import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AlertEmpty from "../AlertEmpty/alertEmpty";
import { useStyles } from "./styleSell";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import ButtonBase from "@material-ui/core/ButtonBase";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

import ReportNotification from "../ReportNotification/reportNotification";
import DialogReportMesaage from "../dialogReportMessage/dialogReportMessage";
import deleted from "./delete.png";
import getData from "../../util/GETTOK";

export default function ListaSells() {
  const [data, setData] = React.useState(null),
    [loading, setLoading] = React.useState(true),
    [onmouseCollapse, setOnmouseCollapse] = React.useState(false),
    [alert, setAlert] = React.useState(false),
    [description, setDescription] = React.useState(false),
    [dataReport, setDataReport] = React.useState({
      open: false,
      id: false,
      name: false,
      url: false,
    });
  const classes = useStyles();
  useEffect(() => {
    getDataSells()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getDataSells =()=>{
    const id = localStorage.getItem("id");
    getData(`/ventas/${id}`).then((data) => {
      if (!data) {
        setData(data);
        setLoading(false);
      } else {
        setData(data);
        setLoading(false);
      }
    });
  }
  const messageStatusReport = (infoStatus) => {
    setAlert(infoStatus);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };
  const handleChangeStateReport = (id, name) => {
    if (dataReport.open) {
      setDataReport({
        open: false,
      });
      getDataSells();
    } else {
      setDataReport({
        open: true,
        id: id,
        name: name,
        url: "/reportClient",
      });
    }
  };
  const switchDescription = () => {
    !description ? setDescription(true) : setDescription(false);
  };
  const switchOnMouseCollapse = (event) => {
    setOnmouseCollapse(event);
  };
  const AlertEmptyData = () => {
    const tittle = "Ups..! Aun no vendiste nada 😢.";
    const subtitle =
      'Prueba modificando tus publicaciones, da click en "Mis Publicaciones".';
    const cardButton = "inicio";
    return (
      <AlertEmpty tittle={tittle} subtitle={subtitle} cardButton={cardButton} />
    );
  };
  if (localStorage.getItem("user") != null) {
    if (loading) {
      return <div>CARGANDO</div>;
    } else {
      if (data === "No tienes publicaciones ACTIVAS") {
        return <AlertEmptyData />;
      } else {
        return (
          <div>
            <ReportNotification notification={alert} />
            <div>
              <List className={classes.list}>
                {data.map((publicacion) => {
                  return (
                    <>
                      <Collapse
                        margin={1}
                        onMouseOver={() =>
                          switchOnMouseCollapse(publicacion._id)
                        }
                        onMouseOut={() => switchOnMouseCollapse(false)}
                        width="100%"
                        in={onmouseCollapse === publicacion._id}
                        collapsedHeight={130}
                      >
                        <ListItem>
                          <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                              <Grid container spacing={2}>
                                <Grid item className={classes.gridImage}>
                                  <Grid container spacing={1}>
                                  <Grid item>
                                  <Box
                                    component="fieldset"
                                    borderColor="transparent"
                                  >
                                    <Typography component="legend">
                                      Calificación venta
                                    </Typography>
                                    <Rating
                                      name="read-only"
                                      value={publicacion.calificacion}
                                      readOnly
                                    />
                                  </Box>
                                  </Grid>
                                  
                               <Grid item>
                               {publicacion.publicacion ? (
                                      <Button onClick={switchDescription}>
                                        Mostrar Descripción
                                      </Button>
                                    ) : null}
                               </Grid>
                               </Grid>
                                  <>
                                  {publicacion.reportecliente === "Pendiente" ? (
                                    <>
                                      <ButtonBase
                                        focusRipple
                                        key={publicacion._id}
                                        className={classes.image}
                                        focusVisibleClassName={
                                          classes.focusVisible
                                        }
                                        style={{
                                          width: "100%",
                                        }}
                                        onClick={() =>
                                          handleChangeStateReport(
                                            publicacion._id,
                                            !publicacion.publicacion
                                              ? "Publicación Eliminada"
                                              : publicacion.publicacion
                                                  .nombreproducto
                                          )
                                        }
                                      >
                                        <span
                                          className={classes.imageSrc}
                                          style={{
                                            backgroundImage: `url(${!publicacion.publicacion?deleted:publicacion.publicacion.idimagen})`,
                                          }}
                                        />
                                        <span
                                          className={
                                            classes.imageBackdropReport
                                          }
                                        />
                                        <span
                                          className={classes.imageReportButton}
                                        >
                                          <Typography
                                            component="span"
                                            variant="subtitle1"
                                            color="inherit"
                                            className={classes.imageTitle}
                                          >
                                            Reportar Cliente
                                            <span
                                              className={
                                                classes.imageMarkedReport
                                              }
                                            />
                                            <ReportProblemIcon>
                                              Reportar
                                            </ReportProblemIcon>
                                          </Typography>
                                        </span>
                                      </ButtonBase>
                                      
                                    </>
                                  ) : (
                                    <CardMedia
                                      component="img"
                                      alt="Contemplative Reptile"
                                      className={
                                        !publicacion.publicacion
                                          ? classes.imageContendDeleted
                                          : classes.imageList
                                      }
                                      image={
                                        !publicacion.publicacion
                                          ? deleted
                                          : publicacion.publicacion.idimagen
                                      }
                                      title="Contemplative Reptile"
                                    />
                                  )}
                                  </>
                                 
                                </Grid>
                                      
                                <Grid item className={classes.gridInformation}>
                                  <ListItemText
                                    primary={
                                      !publicacion.publicacion
                                        ? "Publicación Eliminada"
                                        : `${publicacion.publicacion.nombreproducto} $${publicacion.publicacion.precio}`
                                    }
                                    secondary={
                                      <React.Fragment>
                                        <Typography className="content">
                                          {`Fecha venta:`}
                                          <br></br>
                                          {publicacion.fechacompra}
                                          <br></br>
                                          {`Nombre del cliente:`}
                                          <br></br>
                                          {`${publicacion.comprador.nombre} ${publicacion.comprador.apellido}`}
                                          <br></br>
                                          {`Telefono del cliente:`}
                                          <br></br>
                                          {publicacion.comprador.telefono}
                                          <br></br>
                                          {`correo: `}
                                          <br></br>
                                          {publicacion.comprador.correo}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                  />
                                </Grid>
                                <Grid item className={classes.gridReport}>
                                {publicacion.reportecliente !==
                                    "Pendiente" ? (
                                      <ListItemText
                                        primary={`Reporte:`}
                                        secondary={
                                          <React.Fragment>
                                            <Typography    >
                                              
                                              {publicacion.reportecliente}
                                            </Typography>
                                          </React.Fragment>
                                        }
                                      />
                                    ) : null}
                                    </Grid>
                                    {description ? (
                                    <Grid
                                      item
                                      className={classes.gridDescription}
                                    >
                                      <React.Fragment>
                                        <Typography className={classes.content}>
                                          Descripción:
                                          <br></br>
                                          <TextField
                                            className={classes.gridDescription}
                                            variant="outlined"
                                            value={
                                              !publicacion.publicacion
                                                ? "Publicación Eliminada"
                                                : publicacion.publicacion
                                                    .descripcion
                                            }
                                            multiline
                                            rowsMax={14}
                                            disabled
                                          />
                                        </Typography>
                                      </React.Fragment>
                                    </Grid>
                                  ) : null}
                              </Grid>
                            </Grid>
                          </Grid>
                        </ListItem>
                      </Collapse>
                      <Divider />
                      <DialogReportMesaage
                        data={dataReport}
                        statusNotification={messageStatusReport}
                        statusReport={handleChangeStateReport}
                      />
                    </>
                  );
                })}
              </List>
            </div>
          </div>
        );
      }
    }
  } else {
    return (window.location.href = "http://localhost:3000/ingresar");
  }
}
