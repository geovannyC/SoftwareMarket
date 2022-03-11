import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grow from "@material-ui/core/Grow";
import TextField from "@material-ui/core/TextField";
import dataCities from "../publicar/QuitoCities.json";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useStyles } from "./stylePublications";

import actualizarPublicacion from "../../util/POSTTOK";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false),
    [descripcion, setDescripcion] = React.useState(false),
    [ciudad, setCiudad] = React.useState(false),
    [precio, setPrecio] = React.useState(false),
    [updateDialog, setUpdateDialog] = React.useState(false),
    [alertDeletePublication, setAlertDeletePublication] = React.useState(false);

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const deletePublication = (id) => {
    const data = JSON.stringify({
      id: id
    })
    const url = "/borrarPublicacion"
    actualizarPublicacion(data,url).then((response) => {
      console.log(data)
      if (response) {
        dialogAlertDeletePublication();
      } else {
        alert("error servidor");
      }
    });
  };
  const dialogAlertDeletePublication = () => {
    if (alertDeletePublication) {
      setAlertDeletePublication(false);
      return (window.location.href = "http://localhost:3000");
    } else {
      setAlertDeletePublication(true);
    }
  };
  const inyectDescription = (event) => {
    event.target.value === ""
      ? setDescripcion(props.data.descripcion)
      : setDescripcion(event.target.value);
    // setDescripcion(event.target.value)
  };
  const inyectCiudad = (value) => {
    const checkInput = dataCities.find((city) => city.city === value)
      ? setCiudad(value)
      : false;
    return checkInput;
  };
  const inyectPrecio = (event) => {
    event.target.value === ""
      ? setPrecio(props.data.precio)
      : setPrecio(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
    setCiudad(false);
    setDescripcion(false);
    setPrecio(false);
  };

  const closeUpdateDialog = (message) => {
    if (updateDialog) {
      setUpdateDialog(false);
    } else {
      setUpdateDialog(message);
    }
  };

  const actualizar = async (des, city, pric, id) => {
    const data = JSON.stringify({
      descripcion: des,
      ciudad: city,
      precio: pric,
      estado: "Pendiente",
      _id: id,
    });
    if (
      props.data.descripcion === des &&
      props.data.ciudad === city &&
      props.data.precio === pric
    ) {
      closeUpdateDialog("warning");
    } else {
      await actualizarPublicacion(data, "/actualizarpublicacion").then(
        (data) => {
          if (data) {
            closeUpdateDialog("Success");
            setTimeout(() => window.location.reload(), 2000);
          } else {
            alert("error del servidor");
          }
        }
      );
    }
  };
  const AlertDeletePublication = () => {
    return (
      <Dialog
        open={alertDeletePublication}
        onClose={dialogAlertDeletePublication}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="success">
          Tú publicación se ha eliminado con éxito
        </Alert>
        <DialogActions></DialogActions>
      </Dialog>
    );
  };
  const UpdateDialog = () => {
    if (!updateDialog) {
      return null;
    } else if (updateDialog === "Success") {
      return (
        <Dialog
          open={Boolean(updateDialog)}
          onClose={closeUpdateDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Alert severity="success">
            <AlertTitle>Actualizado ✅</AlertTitle>
            Felicitaciones tu Publicación ha sido actualizada con éxito.
          </Alert>
        </Dialog>
      );
    } else if (updateDialog === "warning") {
      return (
        <Dialog
          open={Boolean(updateDialog)}
          onClose={closeUpdateDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Alert severity="warning">
            <AlertTitle>Error </AlertTitle>
            No haz realizado ningún cambio.
          </Alert>
        </Dialog>
      );
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        className={classes.boton}
      >
        Editar o Borrar
      </Button>
      <form>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent className={classes.dialog}>
            {/* <Grow
in={open}
style={{ transformOrigin: '0 0 0' }}
{...(open ? { timeout: 0 } : {})}
> */}
            <DialogContentText id="titulo">
              <TextField
                className={classes.designInput}
                disabled
                id="titulo"
                label="Nombre del Producto"
                defaultValue={props.data.nombreproducto}
                variant="outlined"
              />
            </DialogContentText>
            {/* </Grow> */}
            <Grow
              in={open}
              style={{ transformOrigin: "0 0 0" }}
              {...(open ? { timeout: 500 } : {})}
            >
              <DialogContentText id="description">
                <TextField
                  error={descripcion && descripcion === props.data.descripcion}
                  helperText={
                    descripcion && descripcion === props.data.descripcion
                      ? "No se va ha realizar ningún cambio en descripción"
                      : null
                  }
                  required
                  className={classes.designInput}
                  id="outlined-multiline-static"
                  label="Descripción"
                  defaultValue={props.data.descripcion}
                  multiline
                  rows={10}
                  onChange={inyectDescription}
                  variant="outlined"
                />
              </DialogContentText>
            </Grow>
            <Grow
              in={open}
              style={{ transformOrigin: "0 0 0" }}
              {...(open ? { timeout: 1000 } : {})}
            >
              <DialogContentText id="empresa">
                <TextField
                  className={classes.designInput}
                  disabled
                  id="empresa"
                  label="Empresa"
                  defaultValue={props.data.empresa}
                  variant="outlined"
                />
              </DialogContentText>
            </Grow>
            <Grow
              in={open}
              style={{ transformOrigin: "0 0 0" }}
              {...(open ? { timeout: 1500 } : {})}
            >
              <DialogContentText id="ciudad">
                <Autocomplete
                  err={!ciudad ? true : false}
                  freeSolo
                  id="ciudad"
                  options={dataCities}
                  onInputChange={(event, value) => {
                    inyectCiudad(value);
                  }}
                  getOptionLabel={(option) => option.city}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label={!ciudad ? props.data.ciudad : ciudad}
                      variant="outlined"
                      className={classes.designInput}
                    />
                  )}
                />
              </DialogContentText>
            </Grow>
            <Grow
              in={open}
              style={{ transformOrigin: "0 0 0" }}
              {...(open ? { timeout: 2000 } : {})}
            >
              <DialogContentText id="precio">
                <TextField
                  error={
                    precio !== false && precio === props.data.precio
                      ? true
                      : false
                  }
                  helperText={
                    precio !== false && precio === props.data.precio
                      ? "No se va ha realizar ningún cambio en precio"
                      : null
                  }
                  className={classes.designInput}
                  id="precio"
                  label="Precio"
                  type="number"
                  defaultValue={props.data.precio}
                  onChange={inyectPrecio}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </DialogContentText>
            </Grow>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => deletePublication(props.data._id)}
              color="secondary"
            >
              Borrar Publicación
            </Button>
            {(ciudad && ciudad !== props.data.ciudad) ||
            (descripcion && descripcion !== props.data.descripcion) ||
            (precio !== props.data.precio && precio) ? (
              <Button
                type="submit"
                onClick={() =>
                  actualizar(
                    !descripcion ? props.data.descripcion : descripcion,
                    !ciudad ? props.data.ciudad : ciudad,
                    !precio ? props.data.precio : precio,
                    props.data._id
                  )
                }
                color="primary"
              >
                Actualizar
              </Button>
            ) : null}

            <Button onClick={handleClose} color="primary" autoFocus>
              Cancelar
            </Button>
          </DialogActions>
          <AlertDeletePublication />
        </Dialog>
        <UpdateDialog />
      </form>
    </>
  );
}
