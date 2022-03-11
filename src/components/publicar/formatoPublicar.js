import React, { useEffect } from "react";
import { useStyles } from "./styleForm";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Autocomplete from "@material-ui/lab/Autocomplete";
import dataCities from "./QuitoCities.json";
import DialogActions from "@material-ui/core/DialogActions";
import Alert from "@material-ui/lab/Alert";

import PublicarAnuncio from "../../util/POSTTOK";

export default function Publicar() {
  const [imagen, setImagen] = React.useState(false),
    [nombreProducto, setNombreProducto] = React.useState(""),
    [empresa, setEmpresa] = React.useState(""),
    [descripcion, setDescripcion] = React.useState(""),
    [ciudad, setCiudad] = React.useState(""),
    [precio, setPrecio] = React.useState(""),
    [loading, setLoading] = React.useState(true),
    [open, setOpen] = React.useState(false);
  const classes = useStyles();
  useEffect(() => {
    setLoading(false);
  }, []);
  const handleClickOpen = () => {
    if (open) {
      setOpen(false);
      window.location.reload();
    } else {
      setOpen(true);
    }
  };
  const function_nombreproducto = (event) => {
    setNombreProducto(event.target.value);
  };
  const function_empresa = (event) => {
    setEmpresa(event.target.value);
  };
  const function_descripcion = (event) => {
    setDescripcion(event.target.value);
  };
  const function_precio = (event) => {
    if(event.target.value.length<=4){
      setPrecio(event.target.value);
    }
   
  
  };
  const function_envio = async () => {
    const data = JSON.stringify({
      idimagen: imagen,
      nombreproducto: nombreProducto,
      empresa: empresa,
      descripcion: descripcion,
      precio: precio,
      ciudad: ciudad,
      estadopublicacion: "Pendiente",
      usuario: localStorage.getItem("id"),
    });
    await PublicarAnuncio(data, "/contenido").then((response) => {
      if (response) {
        handleClickOpen();
      } else {
        alert("fallo en el servidor");
      }
    });
  };
  const function_borrarImagen = () => {
    setImagen(false);
  };
  const uploadImage = async (file) => {
    try {
      var reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = async () => {
        setImagen(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    } catch (error) {
      return null;
    }
  };
  const inputCity = (value) => {
    const checkInput = dataCities.find((city) => city.city === value)
      ? setCiudad(value)
      : false;
    return checkInput;
  };
  const alertSendData = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleClickOpen}>
          <Alert severity="success">
            Tu publicación ha sido creada con éxito, y está a la espera de
            aprobación por el administrador
          </Alert>
          <DialogActions>
            <Button onClick={handleClickOpen} color="primary" autoFocus>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  const function_form = () => {
    return (
      <Box p={2}>
        <form className={classes.rootForm}>
          <TextField
            error={nombreProducto.length >= 44 ? true : false}
            required
            id="outlined-required"
            label={
              nombreProducto.length < 35
                ? "Título de tú Publicación"
                : nombreProducto.length < 45
                ? `Estas ha ${45 - nombreProducto.length} letra${
                    nombreProducto.length === 44 ? "" : "s"
                  } de alcanzar el límite`
                : `Tú título ha alcanzado número límite de palabras`
            }
            variant="outlined"
            inputProps={{ maxLength: 45 }}
            onChange={function_nombreproducto}
            className={classes.filas}
          />
          {imagen ? (
            <CardMedia
              margin-left={4}
              className={classes.collapseImage}
              image={imagen}
            />
          ) : null}

          <TextField
            error={empresa.length >= 17 ? true : false}
            inputProps={{ maxLength: 18 }}
            required
            id="outlined-required"
            label={
              empresa.length < 13
                ? "Nombre de tu Empresa"
                : empresa.length < 18
                ? `Estas ha ${18 - empresa.length} letra${
                    empresa.length === 17 ? "" : "s"
                  } de alcanzar el límite.`
                : `Empresa ha alcanzado número límite de palabras`
            }
            variant="outlined"
            onChange={function_empresa}
            className={classes.filas}
          />

          <TextField
            error={descripcion.length >= 799 ? true : false}
            id="outlined-multiline-static"
            label={
              descripcion.length < 750
                ? "Descripción de tu Publicación"
                : descripcion.length < 800
                ? `Estas ha ${800 - descripcion.length} letra${
                    descripcion.length === 799 ? "" : "s"
                  } de alcanzar el límite.`
                : `Descripción ha alcanzado número límite de palabras`
            }
            inputProps={{ maxLength: 800 }}
            multiline
            rows={15}
            onChange={function_descripcion}
            variant="outlined"
            className={classes.filas}
          />

          <Autocomplete
            freeSolo
            id="combo-box-demo"
            options={dataCities}
            onInputChange={(event, value) => {
              inputCity(value);
            }}
            getOptionLabel={(option) => option.city}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ciudad"
                variant="outlined"
                className={classes.filas}
              />
            )}
          />

          <TextField
            required
            error={precio.length>=4}
            id="outlined-number"
            label={precio.length>=4?"Solo puedes ingresar máximo 4 dígitos": "Precio"}
            type="number"
            onChange={function_precio}
            InputProps={{ maxLength: 4 }}
            variant="outlined"
            className={classes.filas}
          />
        </form>
        <div className={classes.filas}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={uploadImage}
          />
          <label htmlFor="contained-button-file" className={classes.rootForm}>
            <Button variant="contained" color="primary" component="span">
              Subir Imagen
            </Button>
          </label>
          <div className={classes.rootForm}>
            <Button
              variant="contained"
              color="secondary"
              component="span"
              disabled={imagen ? false : true}
              onClick={function_borrarImagen}
            >
              Borrar Imagen
            </Button>
            {nombreProducto &&
            empresa &&
            descripcion &&
            precio &&
            ciudad &&
            imagen ? (
              <Button
                className={classes.collapseButton}
                variant="contained"
                color="primary"
                component="span"
                onClick={function_envio}
              >
                Crear Publicación
              </Button>
            ) : null}
          </div>
        </div>
      </Box>
    );
  };
  const preview = () => {
    return (
      <div>
        <Box p={3}>
          <Typography
            className={classes.title}
            variant="h1"
            component="h2"
            gutterBottom
          >
            {nombreProducto}
          </Typography>
          {imagen ? (
            <CardMedia m={2} className={classes.media} image={imagen} />
          ) : null}

          <Typography className={classes.filas} variant="h5" component="h2">
            {empresa}
          </Typography>

          <TextField
            className={classes.pos}
            input="true"
            id="standard-multiline-flexible"
            value={descripcion}
            multiline
            rowsMax={12}
            disabled
          />
          <Typography className={classes.filas}>{ciudad}</Typography>
          <Typography className={classes.filas}>
            {precio ? `$ ${precio}` : null}
          </Typography>
          {nombreProducto &&
          empresa &&
          descripcion &&
          precio &&
          ciudad &&
          imagen ? (
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={function_envio}
            >
              Crear Publicación
            </Button>
          ) : null}
        </Box>
      </div>
    );
  };
  if (loading) {
    return <Typography>Cargando</Typography>;
  } else {
    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={5}>
            <Grid item>
              <Paper className={imagen ? classes.paper : classes.paperStandard}>
                {function_form()}
              </Paper>
            </Grid>
            <Grid item>
              <div className={classes.collapsemd}>
                <Paper className={classes.paper}>
                  {preview()}
                  {alertSendData()}
                </Paper>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
