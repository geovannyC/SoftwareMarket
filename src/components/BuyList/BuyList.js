import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Collapse from "@material-ui/core/Collapse";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { useStyles } from "./styleList";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ButtonBase from "@material-ui/core/ButtonBase";
import AlertEmpty from "../AlertEmpty/alertEmpty";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

import ReportNotification from "../ReportNotification/reportNotification";
import DialogReportMesaage from "../dialogReportMessage/dialogReportMessage";
import usuarios from "../../util/GETTOK";
import estadoPublicacion from "../../util/POSTTOK";
import deleted from "./delete.png";

const labels = {
  1: "Muy Malo",

  2: "Regular",

  3: "Bueno",

  4: "Recomendado",

  5: "El Mejor!",
};
export default function BuyList() {
  const [data, setData] = useState(null),
    [loading, setLoading] = useState(true),
    [onmouseCollapse, setOnmouseCollapse] = useState(false),
    [sellId, setSellId] = useState(null),
    [publicationId, setPublicationId] = useState(null),
    [open, setOpen] = useState(false),
    [value, setValue] = useState(2),
    [hover, setHover] = useState(-1),
    [alert, setAlert] = useState(false),
    [description, setDescription] = useState(false),
    [dataReport, setDataReport] = useState({
      open: false,
      id: false,
      name: false,
      url: false,
    });
  const classes = useStyles();
  useEffect(() => {
    getDataBuys();
  }, []);
  const getDataBuys = async () => {
    const url = `/compras/${localStorage.getItem("id")}`;
    await usuarios(url).then((response) => {
      if (!response) {
        setData(false);
        setLoading(false);
      } else {
        setData(response);
        setLoading(false);
      }
    });
  };
  const handleClickOpen = (sellId, publicationId) => {
    setSellId(sellId);
    setPublicationId(publicationId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeStateReport = (id, name) => {
    console.log(id, name);
    if (dataReport.open) {
      setDataReport({
        open: false,
      });
      getDataBuys();
    } else {
      setDataReport({
        open: true,
        id: id,
        name: name,
        url: "/reportPublication",
      });
    }
  };

  const switchOnMouseCollapse = (event) => {
    setOnmouseCollapse(event);
  };
  const switchDescription = () => {
    !description ? setDescription(true) : setDescription(false);
  };
  const sendRaiting = () => {
    const url = "/raiting";
    setAlert("loading");
    setOpen(false);
    const data = JSON.stringify({
      _id: sellId,
      _idPub: publicationId,
      calificacion: value,
    });

    estadoPublicacion(data, url).then((data) => {
      if (data) {
        getDataBuys();
        setAlert("success");
      } else {
        setAlert("error al actualizar");
      }
    });
  };
  const messageStatusReport = (infoStatus) => {
    setAlert(infoStatus);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };
  const dialogRaiting = () => {
    console.log(publicationId, sellId);
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Califica el servicio de esta Publicación"}
          </DialogTitle>
          <DialogContent>
            <div className={classes.raiting}>
              <Rating
                name="hover-feedback"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
              {value !== null && (
                <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={sendRaiting} color="primary" autoFocus>
              Enviar Calificación
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  const AlertEmptyData = () => {
    const tittle = "No haz contactado ninguna empresa.";
    const subtitle = 'Haz click en "inicio", y contacta una empresa.';
    const cardButton = "inicio";
    return (
      <AlertEmpty tittle={tittle} subtitle={subtitle} cardButton={cardButton} />
    );
  };

  if (localStorage.getItem("user") != null) {
    if (loading) {
      return <div>CARGANDO</div>;
    } else {
      if (!data) {
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
                      <div key={publicacion._id}>
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
                            <Grid
                              container
                              className={classes.root}
                              spacing={2}
                            >
                              <Grid item xs={12}>
                                <Grid container spacing={2}>
                                  <Grid item className={classes.gridImage}>
                                    <Box
                                      component="fieldset"
                                      borderColor="transparent"
                                    ></Box>

                                    {publicacion.calificacion === "Pendiente" &&
                                    publicacion.publicacion !== null ? (
                                      <ButtonBase
                                        focusRipple
                                        key={publicacion._id}
                                        className={publicacion.publicacion?classes.image:classes.imageContendDeleted}
                                        focusVisibleClassName={
                                          classes.focusVisible
                                        }
                                        style={{
                                          width: "100%",
                                        }}
                                        onClick={() =>
                                          handleClickOpen(
                                            publicacion._id,
                                            publicacion.publicacion._id
                                          )
                                        }
                                      >
                                        <span
                                          className={classes.imageSrc}
                                          style={{
                                            backgroundImage: `url(${
                                              !publicacion.publicacion
                                                ? deleted
                                                : publicacion.publicacion
                                                    .idimagen
                                            })`,
                                          }}
                                        />
                                        <span
                                          className={classes.imageBackdrop}
                                        />
                                        <span className={classes.imageButton}>
                                          <Typography
                                            component="span"
                                            variant="subtitle1"
                                            color="inherit"
                                            className={classes.imageTitle}
                                          >
                                            Calificar
                                            <span
                                              className={classes.imageMarked}
                                            />
                                            <StarBorderIcon>
                                              Calificar
                                            </StarBorderIcon>
                                          </Typography>
                                        </span>
                                      </ButtonBase>
                                    ) : publicacion.reporteempresa ===
                                      "Pendiente" ? (
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
                                              backgroundImage: `url(${
                                                !publicacion.publicacion
                                                  ? deleted
                                                  : publicacion.publicacion
                                                      .idimagen
                                              })`,
                                            }}
                                          />
                                          <span
                                            className={
                                              classes.imageBackdropReport
                                            }
                                          />
                                          <span
                                            className={
                                              classes.imageReportButton
                                            }
                                          >
                                            <Typography
                                              component="span"
                                              variant="subtitle1"
                                              color="inherit"
                                              className={classes.imageTitle}
                                            >
                                              Reportar Empresa
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
                                        <Grid container>
                                          <Grid item>
                                            <Typography component="legend">
                                              Calificación
                                            </Typography>
                                          </Grid>
                                          <Grid item>
                                            <Rating
                                              name="disabled"
                                              value={publicacion.calificacion}
                                              disabled
                                            />
                                          </Grid>
                                        </Grid>
                                      </>
                                    ) : (
                                      <>
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
                                        <Grid container>
                                          <Grid item>
                                            <Typography component="legend">
                                              Calificación
                                            </Typography>
                                          </Grid>
                                          <Grid item>
                                            <Rating
                                              name="disabled"
                                              value={publicacion.calificacion}
                                              disabled
                                            />
                                          </Grid>
                                        </Grid>
                                      </>
                                    )}
                                    {publicacion.publicacion ? (
                                      <Button onClick={switchDescription}>
                                        Mostrar Descripción
                                      </Button>
                                    ) : null}
                                  </Grid>
                                  <Grid
                                    item
                                    className={classes.gridInformation}
                                  >
                                    <ListItemText
                                      primary={
                                        !publicacion.publicacion
                                          ? "Publicación Eliminada"
                                          : `${publicacion.publicacion.nombreproducto} $${publicacion.publicacion.precio}`
                                      }
                                      secondary={
                                        <React.Fragment>
                                          <Typography
                                            className={classes.content}
                                          >
                                            {`Fecha compra:`}
                                            <br></br>
                                            {publicacion.fechacompra}
                                            <br></br>
                                            {`Nombre:`}
                                            <br></br>
                                            {`${publicacion.vendedor.nombre} ${publicacion.vendedor.apellido}`}
                                            <br></br>
                                            {`Telefono: `}
                                            <br></br>
                                            {publicacion.vendedor.telefono}
                                            <br></br>
                                            {`Correo:`}
                                            <br></br>
                                            {publicacion.vendedor.correo}
                                            <br></br>
                                            {`Cedula vendedor:`}
                                            <br></br>
                                            {publicacion.vendedor.cedula}
                                            <br></br>
                                            {`Ciudad:`}
                                            <br></br>
                                            {!publicacion.publicacion
                                              ? "Publicación Eliminada"
                                              : publicacion.publicacion.ciudad}
                                            <br></br>
                                          </Typography>
                                        </React.Fragment>
                                      }
                                    />
                                  </Grid>
                                  <Grid item className={classes.gridReport}>
                                    {publicacion.reporteempresa !==
                                    "Pendiente" ? (
                                      <ListItemText
                                        primary={`Reporte:`}
                                        secondary={
                                          <React.Fragment>
                                            <Typography>
                                              {publicacion.reporteempresa}
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
                      </div>
                      {open ? dialogRaiting() : null}
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
    return (window.location.href = "http://localhost:3000");
  }
}
