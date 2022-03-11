import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import check from "./check.png";
import Divider from "@material-ui/core/Divider";
import cx from "clsx";
import { useStyles } from "./styleContent";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useFourThreeCardMediaStyles } from "@mui-treasury/styles/cardMedia/fourThree";
import { useN04TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n04";
import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";
import { TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import usuarios from "../../util/GETTOK";
import estadoPublicacion from "../../util/POSTTOK";

const labels = {
  1: "Muy Malo",

  2: "Regular",

  3: "Bueno",

  4: "Recomendado",

  5: "El Mejor!",
};
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FC2020",
    },
    secondary: {
      main: "#11cb5f",
    },
  },
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Publicacion(props) {
  const [dialog, setDialog] = React.useState(false),
    [diallogS, setDiallogS] = React.useState(false),
    [user, setUser] = React.useState(false),
    [openN, setOpenN] = React.useState(false);
  const classes = useStyles();
  const switchDialog = () => {
    dialog ? setDialog(false) : setDialog(true);
  };
  const switchDialogSellman = () => {
    diallogS ? setDiallogS(false) : setDiallogS(true);
  };
  const shadowStyles = useSoftRiseShadowStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const handleNotificationSwitch = () => {
    openN ? setOpenN(false) : setOpenN(true);
  };
  const fnDialogSellman = async (content) => {
    const id = `/getPersonas/${localStorage.getItem("id")}`;
    if (!user) {
      await usuarios(`/getPersonas/${content.usuario._id}`).then(
        async (userPublishing) => {
          if (!userPublishing) {
            console.log("error servidor vendedor");
          } else {
            await usuarios(id).then(async (buyer) => {
              if (!buyer) {
                console.log("error servidor comprador");
              } else {
                setUser(userPublishing);
                if (userPublishing._id === buyer._id) {
                  setUser("The same users");
                } else {
                  const urlBuy = "/compra";
                  const urlSendEmail = "/sendEmail";
                  let date = new Date().getDate();
                  let month = new Date().getMonth() + 1;
                  let year = new Date().getFullYear();
                  const datos = {
                    publicacion: content._id,
                    vendedor: userPublishing._id,
                    fechacompra: `Dia :${date}, Mes: ${month}, Año: ${year}`,
                    comprador: buyer._id,
                    calificacion: "Pendiente",
                    reportecliente: "Pendiente",
                    reporteempresa: "Pendiente"
                  };
                  const emailData = {
                    nombreproducto: content.nombreproducto,
                    emailvendedor: userPublishing.correo,
                    empresa: content.empresa,
                    precio: content.precio,
                    nombrecomprador: buyer.nombre,
                    telefonocomprador: buyer.telefono,
                    correocomprador: buyer.correo,
                    idimagen: content.idimagen,
                    fechacompra: `Dia :${date}, Mes: ${month}, Año: ${year}`,
                  };
                  console.log(datos.vendedor);
                  if (!datos.comprador || !datos.vendedor) {
                    setDiallogS(false);
                    setDialog(false);
                    setOpenN("error servidor");
                  } else {
                    await estadoPublicacion(JSON.stringify(datos) , urlBuy).then((response) => {
                      if (response) {
                        switchDialogSellman()
                        setOpenN("Creado exitosamente")

                      } else {
                        setOpenN("error servidor");
                      }
                    });
                    await estadoPublicacion(JSON.stringify(emailData) , urlSendEmail).then(
                      (response) => {
                        if (response) {
                          console.log("email enviado");
                        } else {
                          setOpenN("error servidor");
                        }
                      }
                    );
                  }
                }
              }
            });
          }
        }
      );
    } else {
      return null;
    }
  };
  const notificationBuy = (
    <div>
      <Snackbar
        open={openN}
        autoHideDuration={6000}
        onClose={handleNotificationSwitch}
      >
        {openN === "error servidor" ? (
          <Alert onClose={handleNotificationSwitch} severity="warning">
            Error en el servidor, intenta volver a iniciar sesión.
          </Alert>
        ) : openN === "Creado exitosamente" ? (
          <Alert onClose={handleNotificationSwitch} severity="success">
            Compra realizada éxitosamente!
          </Alert>
        ) : (
          <Alert onClose={handleNotificationSwitch} severity="error">
            Error, verifica la información.
          </Alert>
        )}
      </Snackbar>
    </div>
  );
  const dialogSellman = (nombreproducto) => {
    if (!user) {
      return (
        <Dialog
          open={diallogS}
          onClose={() => setDiallogS(false)}
          onClick={null}
        >
          <Card variant="outlined">
            <DialogTitle id="alert-dialog-title">
              {"Registrate o Inicia sesión....😅 "}
            </DialogTitle>
            <CardActions>
              <Button size="small" onClick={() => setDiallogS(false)}>
                cerrar
              </Button>
            </CardActions>
          </Card>
        </Dialog>
      );
    } else {
      if (user === "The same users") {
        return (
          <Dialog
            open={diallogS}
            onClose={() => setDiallogS(false)}
            onClick={null}
          >
            <Card variant="outlined">
              <DialogTitle id="alert-dialog-title">
                {"Intentas comprar en tu propia publicación....😅 "}
              </DialogTitle>
              <CardActions>
                <Button size="small" onClick={() => setDiallogS(false)}>
                  cerrar
                </Button>
              </CardActions>
            </Card>
          </Dialog>
        );
      } else {
        const content = props.contenido;
        return (
          <Dialog open={diallogS} onClose={switchDialogSellman} onClick={null}>
            <Card variant="outlined">
              <CardContent>
                <CardMedia image={check} />
                <br />
                <Typography variant="h5" component="h2">
                  {`Felicitaciones acabas de contactar a: ${content.nombreproducto}`}
                </Typography>
                <Typography color="textSecondary">
                  {`Nombre del vendedor: ${user.nombre} ${user.apellido}`}
                </Typography>
                <Typography color="textSecondary">
                  {`Correo: ${user.correo}`}
                </Typography>
                <Typography color="textSecondary">
                  {`Numero de contacto: ${user.telefono}`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={switchDialogSellman}>
                  cerrar
                </Button>
              </CardActions>
            </Card>
          </Dialog>
        );
      }
    }
  };
  const dialogPublication = () => {
    const content = props.contenido;
    return (
      <div>
        <Dialog
          open={dialog}
          onClose={() => switchDialog()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.rootCardPreview}
        >
          <Card>
            <CardContent>
              <Typography className={classes.titlepreview} gutterBottom>
                {content.nombreproducto}
              </Typography>
              <CardMedia image={content.idimagen} className={classes.media} />
              <Typography variant="h5" className={classes.price}>
                {`$${content.precio}`}
              </Typography>
              <Typography color="textSecondary">{content.ciudad}</Typography>
              <TextField
                className={classes.descriptionPreview}
                value={content.descripcion}
                multiline
                rowsMax={8}
                disabled
              />
              <Divider />

              <Typography className={classes.entreprice}>
                {`Empresa: ${content.empresa}`}
              </Typography>
            </CardContent>
            <CardActions>
              <ThemeProvider theme={theme}>
                {content.usuario._id === localStorage.getItem("id") ? null : (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => fnDialogSellman(content)}
                  >
                    Comprar <span role="img">🛒</span>
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => switchDialog()}
                >
                  Cancelar <span role="img">❌</span>
                </Button>
              </ThemeProvider>
            </CardActions>
          </Card>
        </Dialog>
      </div>
    );
  };
  return (
    <>
      <Card
        className={cx(classes.rootCard, shadowStyles.root)}
        onClick={() => switchDialog()}
      >
        <CardMedia
          className={cx(classes.media, mediaStyles.root)}
          image={props.contenido.idimagen}
        />
        <CardContent>
          <TextInfoContent
            classes={textCardContentStyles}
            overline={props.contenido.ciudad}
          />
          <Typography
            className={
              props.contenido.nombreproducto.length > 50
                ? classes.titleS
                : classes.titleM
            }
          >
            {props.contenido.nombreproducto}
          </Typography>

          <Divider style={{ marginTop: 70 }} />
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Calificación</Typography>
            <Grid container>
              <Grid item>
                <Rating name="read-only" value={props.calificacion} readOnly />
              </Grid>

              <Grid item>
                <Typography component="legend" style={{ fontSize: 10 }}>
                  {labels[props.calificacion]}
                </Typography>
              </Grid>
            </Grid>

            <Grid>
              <Typography>{`$${props.contenido.precio}`}</Typography>
            </Grid>
          </Box>

          <Typography color="textSecondary" className={classes.description}>
            Empresa:
            {props.contenido.empresa}
          </Typography>
        </CardContent>
      </Card>
      {dialogPublication()}
      {dialogSellman()}
      {notificationBuy}
    </>
  );
}
