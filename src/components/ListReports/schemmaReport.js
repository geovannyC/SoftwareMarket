import React, { useEffect, useCallback } from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Typography } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useStyles } from "./styleReport";
import DialogPenaltyMesaage from "../dialogPenaltyMessage/dialogPenaltyMessage";
import DialogSlideQuestion from "../DialogSlideQuestion/dialogSlideQuestion";
import deleted from "../../assets/delete.png";
import Button from '@material-ui/core/Button';

export default function SchemmaReport(props) {
  const sell = props.data;
  const classes = useStyles();
  const actualizarPublicacion = async (id, mensaje, url) => {
    const data =
      url === "/actualizarusuario"
        ? JSON.stringify({
            estado: mensaje,
            _id: id,
          })
        : JSON.stringify({
            estadopublicacion: mensaje,
            _id: id,
          });
    props.setUpdateData(data, url);
  };
  const dialogNotification = () => {
    props.dialogNotification();
  };
  const messageStatusNotification = () => {
    props.statusNotification("success");
    setTimeout(() => {
      props.statusNotification(false);
    }, 2000);
  };
  const messageStatusDeletedReport = (status)=>{
    props.statusNotification(status);
  }
  const GroupButtons = (props) => {
    return (
      <Grid container>
        <Grid item>
      <Button
      variant="contained"
      color="primary"
      className={classes.buttonDisable}
      onClick={() => actualizarPublicacion(props.id, props.status, props.url)}
    >
      Deshabilitar
    </Button>
    </Grid>
    <Grid item>
        <DialogPenaltyMesaage
          data={props.nombre}
          datauser={props.correo}
          sendNotification={() => messageStatusNotification()}
        />
        </Grid>
    </Grid>
    );
  };
  return (
    <ListItem alignItems="flex-start" key={sell._id}>
      <ListItemAvatar>
        <Avatar
          alt="Remy Sharp"
          src={!sell.publicacion ? deleted : sell.publicacion.idimagen}
        />
      </ListItemAvatar>
      <ListItemText
      
        primary={
          !sell.publicacion ? (
            "Publicación Eliminada"
          ) : (
            <Typography>{`Reporte de la publicación: ${sell.publicacion.nombreproducto}`}</Typography>
          )
        }
        secondary={
          <React.Fragment>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <ul className={classes.ul}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                      <Grid item xs>
                        <Typography variant="h6">{`Reporte`}</Typography>
                      </Grid>
                      <Grid item className={classes.buttonBorder}>
                        <DialogSlideQuestion messageStatusDeletedReport={messageStatusDeletedReport} name={!sell.publicacion?'Publicación Eliminada':sell.publicacion.nombreproducto} id={sell._id}/>
                      </Grid>
                    </Grid>
                  </Grid>

                  {`id: ${sell._id}`}

                  <br></br>
                  {`Fecha del contacto: ${sell.fechacompra}`}

                  <br></br>
                  {sell.reportecliente === "Pendiente" ? null : (
                    <>
                      {`Reporte del Cliente: ${sell.reportecliente}`}

                      <br></br>
                    </>
                  )}
                  {sell.reporteempresa === "Pendiente" ? null : (
                    <>{`Reporte de la Empresa: ${sell.reporteempresa}`}</>
                  )}
                </ul>
              </CardContent>
            </Card>
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    <h2>{`Cuenta empresa`}</h2>
                  </Typography>
                </AccordionSummary>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm container>
                    <Grid item xs>
                      <AccordionDetails>
                        <ul className={classes.ul}>
                          {`id: ${sell.vendedor._id}`}
                          <br></br>
                          {`Nombre del usuario: ${sell.vendedor.nombre} ${sell.vendedor.apellido}`}
                          <br></br>
                          {`Cédula: ${sell.vendedor.cedula}`}
                          <br></br>
                          {`Correo: ${sell.vendedor.correo}`}
                          <br></br>
                          {`Estado: ${sell.vendedor.estado}`}
                          <br></br>
                          {`Teléfono: ${sell.vendedor.telefono}`}
                        </ul>
                      </AccordionDetails>
                    </Grid>
                    <Grid item className={classes.buttonBorder}>
                      {sell.vendedor.estado === "Usuario_Habilitado" ? (
                        <GroupButtons
                          id={sell.vendedor._id}
                          status={"Usuario_Inhabilitado"}
                          url={"/actualizarusuario"}
                          nombre={`${sell.vendedor.nombre} ${sell.vendedor.apellido}`}
                          correo={sell.vendedor.correo}
                        />
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>
                    <h2>{`Cuenta Cliente`}</h2>
                  </Typography>
                </AccordionSummary>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm container>
                    <Grid item xs>
                      <AccordionDetails>
                        <ul className={classes.ul}>
                          {`id: ${sell.comprador._id}`}
                          <br></br>
                          {`Nombre del usuario: ${sell.comprador.nombre} ${sell.comprador.apellido}`}
                          <br></br>
                          {`Cédula: ${sell.comprador.cedula}`}
                          <br></br>
                          {`Correo: ${sell.comprador.correo}`}
                          <br></br>
                          {`Estado: ${sell.comprador.estado}`}
                          <br></br>
                          {`Teléfono: ${sell.comprador.telefono}`}
                        </ul>
                      </AccordionDetails>
                    </Grid>
                    <Grid item className={classes.buttonBorder}>
                      {sell.comprador.estado === "Usuario_Habilitado" ? (
                        <GroupButtons
                          id={sell.comprador._id}
                          status={"Usuario_Inhabilitado"}
                          url={"/actualizarusuario"}
                          nombre={`${sell.comprador.nombre} ${sell.comprador.apellido}`}
                          correo={sell.comprador.correo}
                        />
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Accordion>
              {sell.publicacion ? (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography className={classes.heading}>
                      <h2>{`Publicación`}</h2>
                    </Typography>
                  </AccordionSummary>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                      <Grid item xs>
                        <AccordionDetails>
                          <ul className={classes.ul}>
                            {`id: ${sell.publicacion._id}`}
                            <br></br>
                            {`Título: ${sell.publicacion.nombreproducto}`}
                            <br></br>
                            {`Ciudad: ${sell.publicacion.ciudad}`}
                            <br></br>
                            {`Empresa: ${sell.publicacion.empresa}`}
                            <br></br>
                            {`Descripción: ${sell.publicacion.descripcion}`}
                            <br></br>
                            {`Precio: $${sell.publicacion.precio}`}
                            <br></br>
                            {`Calificacion: ${sell.calificacion}`}
                            <br></br>
                            {`Estado: ${sell.publicacion.estadopublicacion}`}
                            <br></br>
                          </ul>
                        </AccordionDetails>
                      </Grid>
                      <Grid item className={classes.buttonBorder}>
                        {sell.publicacion.estadopublicacion === "Habilitada" ? (
                          <GroupButtons
                            id={sell.publicacion._id}
                            status={"Inhabilitada"}
                            url={"/estadopublicacion"}
                            nombre={sell.publicacion.nombreproducto}
                            correo={sell.vendedor.correo}
                          />
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                </Accordion>
              ) : null}
            </div>
          </React.Fragment>
        }
      />

      {/* <ToggleButtonGroup
                      orientation="vertical"
                      value={view}
                      exclusive
                      onChange={handleChange}
                    >
                      {sectionId !== "Habilitada" ? (
                        <ToggleButton
                          value={`${sectionId}${item}opcion1`}
                          aria-label="list"
                          className={classes.buttonEnable}
                          onClick={() =>
                            actualizarPublicacion(item._id, "Habilitada")
                          }
                        >
                          <ThemeProvider theme={theme}>
                            <Typography className={classes.letters}>
                              Habilitar
                            </Typography>
                          </ThemeProvider>
                        </ToggleButton>
                      ) : null}
                      {sectionId !== "Pendiente" &&
                      sectionId !== "Habilitada" ? (
                        <DialogPenaltyMesaage
                          data={item.nombreproducto}
                          datauser={usuario.correo}
                          sendNotification={() => messageStatusNotification()}
                        />
                      ) : null}

                      {sectionId !== "Inhabilitada" ? (
                        <ToggleButton
                          value={`${sectionId}${item}opcion2`}
                          aria-label="module"
                          className={classes.buttonDisable}
                          onClick={() =>
                            actualizarPublicacion(item._id, "Inhabilitada")
                          }
                        >
                          <ThemeProvider theme={theme}>
                            <Typography className={classes.letters}>
                              Inhabilitar
                            </Typography>
                          </ThemeProvider>
                        </ToggleButton>
                      ) : null}
                    </ToggleButtonGroup> */}
    </ListItem>
  );
}
