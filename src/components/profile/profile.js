import React, { useEffect } from "react";
import { useStyles } from "./styleProfile";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Alert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import { IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import usuarios from "../../util/GETTOK";
import comprarPost from "../../util/POSTTOK";
import { Gif } from "@material-ui/icons";

const options = [
  "@gmail.com",
  "@outlook.com",
  "@yahoo.com",
  "@aol.com",
  "@hotmail.com",
  "@gmx.com",
  "@yandex.com",
  "@mail.com",
  "@lycos.com",
];
export default function MultilineTextFields() {
  const classes = useStyles();
  const [name, setName] = React.useState(false),
    [lastName, setLastName] = React.useState(false),
    [ide, setIde] = React.useState(false),
    [email, setEmail] = React.useState(false),
    [contact, setContact] = React.useState(false),
    [image, setImage] = React.useState(false),
    [newImage, setNewImage] = React.useState(false),
    [newEmail, setNewEmail] = React.useState(false),
    [newContact, setNewContact] = React.useState(false),
    [alreadyRegister, setAlreadyRegister] = React.useState(false),
    [currentPassword, setCurrentPassword] = React.useState(false),
    [password, setPassword] = React.useState(false),
    [confirmPassword, setConfirmPassword] = React.useState(false),
    [alert, setAlert] = React.useState(false),
    [value, setValue] = React.useState(options[0]),
    [openUpdatePassword, setOpenUpdatePassword] = React.useState(false),
    [state, setState] = React.useState("Usuario_Habilitado"),
    [lowLevelSecurePass, setLowLevelSecurePass] = React.useState(false),
    [showPassword, setShowPassword] = React.useState(false),
    [showPassword2, setShowPassword2] = React.useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    const url = `/getPersonas/${localStorage.getItem("id")}`;
    usuarios(url).then((user) => {
      setName(user.nombre);
      setLastName(user.apellido);
      setContact(user.telefono);
      setIde(user.cedula);
      setEmail(user.correo.split("@")[0]);
      setState(user.estado);
      setImage(user.imagen);
    });
  };
  const updateData = () => {
    setOpenUpdatePassword(false);
    setAlert("loading");
    const data = JSON.stringify({
      contact: !newContact || newContact.length !== 10 ? contact : newContact,
      email: !newEmail || newEmail.length < 7 ? email : newEmail,
      image: !newImage ? image : newImage,
      _id: localStorage.getItem("id"),
      currentPassword: !currentPassword ? false : currentPassword,
      newPassword: !password ? false : password,
    });
    comprarPost(data, "/actualizardatosusuario")
      .then((result) => {
        console.log(result);
        setNewEmail(false);
        setNewContact(false);
        setPassword(false);
        setCurrentPassword(false);
        setConfirmPassword(false);
        if (result.res === "actualizado") {
          setAlert("success");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.setItem("user", String(result.user));
          localStorage.setItem("token", String(result.token));
          if (newImage) {
            localStorage.setItem("image", newImage);
          }
          getData();
        } else if (result.res === "contraseña incorrecta") {
          setAlert("contraseña incorrecta");
        } else {
          setAlert("error al actualizar");
        }
      })
      .catch(() => {
        setAlert("error al actualizar");
      });
  };
  const handleChangeEmail = async (event) => {
    let data;
    const url = "/findEmail";
    data = JSON.stringify({
      correo: `${event.target.value}${value}`,
    });
    if (event.target.value.length === 0) {
      setNewEmail("");
    } else {
      setNewEmail(`${event.target.value}${value}`);
    }

    await comprarPost(data, url).then((data) => {
      if (data) {
        console.log("usuario registrado");
        setAlreadyRegister(true);
      } else {
        console.log("usuario no registrado");
        setAlreadyRegister(false);
      }
    });
  };
  const handleChangeContact = (event) => {
    setNewContact(event.target.value);
  };
  const handleChangeCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
  };
  const handleChangePassword = (event) => {
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (event.target.value.match(passw)) {
      setLowLevelSecurePass(false);
    } else {
      setLowLevelSecurePass(true);
    }
    setPassword(event.target.value);
  };
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleChangeEmailExtension = (value) => {
    const checkInput = options.find((extension) => extension === value)
      ? setValue(value)
      : false;
    return checkInput;
  };
  const handleClicShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };
  const handleClicShowPassword2 = () => {
    showPassword2 ? setShowPassword2(false) : setShowPassword2(true);
  };
  const switchContentPassword = () => {
    if (openUpdatePassword) {
      setNewEmail(false);
      setNewContact(false);
      setOpenUpdatePassword(false);
      setConfirmPassword(false);
      setPassword(false);
    } else {
      setOpenUpdatePassword(true);
      setConfirmPassword(false);
      setPassword(false);
      setNewEmail(false);
      setNewContact(false);
    }
  };
  const uploadImage = async (file) => {
    try {
      var reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = async () => {
        setNewImage(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    } catch (error) {
      return null;
    }
  };
  const AlertUpdate = () => {
    if (!alert) {
      return null;
    } else if (alert === "loading") {
      return (
        <div className={classes.rootAlert}>
          <Alert variant="filled" severity="warning">
            Actualizando tus datos...
          </Alert>
        </div>
      );
    } else if (alert === "success") {
      return (
        <div className={classes.rootAlert}>
          <Alert variant="filled" severity="success">
            Datos Actualizados
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
    } else if (alert === "contraseña incorrecta") {
      return (
        <div className={classes.rootAlert}>
          <Alert variant="filled" severity="error">
            La contraseña ingresada no es la correcta.
          </Alert>
        </div>
      );
    }
  };

  if (!name || !lastName || !email || !contact || !ide || !state) {
    return <Typography>Cargando</Typography>;
  } else {
    return (
      <>
        <AlertUpdate />
        <Card>
          <CardContent
            className={classes.root}
            style={{
              backgroundColor:
                state === "Usuario_Habilitado"
                  ? "#BEF4EA"
                  : state === "Por_Revisar"
                  ? "#F4EDAC"
                  : "#F3D5BF",
            }}
          >
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}
            >
              <Typography className={classes.title}>
                {state === "Usuario_Habilitado" ? (
                  <>
                    <Typography align="center" className={classes.title}>
                      Usuario Habilitado
                    </Typography>
                    <br />
                    <Typography align="center">
                      Tienes todas las funciones activadas, gracias por respetar
                      las normas de la aplicación
                    </Typography>
                  </>
                ) : state === "Por_Revisar" ? (
                  <>
                    <Typography align="center" className={classes.title}>
                      Usuario Pendiente
                    </Typography>
                    <br />
                    <Typography align="center">
                      Para habilitar esta cuenta acepta los términos y
                      condiciones de la aplicación
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography align="center" className={classes.title}>
                      Usuario Inhabilitado
                    </Typography>
                    <br />
                    <Typography align="center">
                      Para volver a habilitar tu cuenta revisa tu perfíl y
                      cambia la información enviada a tu correo eletrónico
                    </Typography>
                  </>
                )}
              </Typography>
              <Grid item>
                {!openUpdatePassword ? (
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={uploadImage}
                  />
                ) : null}

                <label htmlFor="contained-button-file">
                  <Tooltip
                    title={
                      !openUpdatePassword
                        ? "Haz clic para modificar tu imagen de usuario"
                        : "Tu imagen de perfil"
                    }
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        !newImage && !image
                          ? "https://vignette.wikia.nocookie.net/caramella-girls/images/9/99/Blankpfp.png/revision/latest?cb=20190122015011"
                          : newImage
                          ? newImage
                          : image
                      }
                      className={classes.large}
                    />
                  </Tooltip>
                </label>
              </Grid>
              <Grid item>
                <form className={classes.root} noValidate autoComplete="off">
                  <div>
                    {!openUpdatePassword ? (
                      <>
                        <Tooltip title="No puedes modificar tus nombres">
                          <TextField
                            id="outlined-multiline-flexible"
                            label="Nombres Usuario"
                            multiline
                            rowsMax={4}
                            value={name}
                            variant="outlined"
                            disabled
                          />
                        </Tooltip>
                        <Tooltip title="No puedes modificar tus apellidos">
                          <TextField
                            id="outlined-multiline-flexible"
                            label="Apellidos Usuario"
                            multiline
                            rowsMax={4}
                            value={lastName}
                            variant="outlined"
                            disabled
                          />
                        </Tooltip>
                        <br></br>
                        <Tooltip title="No puedes modificar tu cédula de identidad">
                          <TextField
                            id="outlined-multiline-flexible"
                            label="Cedula"
                            multiline
                            rowsMax={4}
                            value={ide}
                            variant="outlined"
                            disabled
                          />
                        </Tooltip>
                        <br></br>
                        <Grid container>
                          <Grid item>
                            <TextField
                              fullWidth
                              variant="outlined"
                              error={
                                alreadyRegister ||
                                newEmail.length >= 30 ||
                                newEmail.length === 0
                              }
                              helperText={
                                alreadyRegister
                                  ? "El correo ya ha sido registrado."
                                  : null
                              }
                              id="outlined-adornment-weight"
                              inputProps={{ maxLength: 30 }}
                              onChange={handleChangeEmail}
                              defaultValue={email}
                              endAdornment={
                                <InputAdornment position="end">
                                  {value}
                                </InputAdornment>
                              }
                              // aria-describedby="outlined-weight-helper-text"
                            />
                          </Grid>
                          <Grid item>
                            <Autocomplete
                              error={value === null || value === "" || !value}
                              fullWidth
                              value={value}
                              onInputChange={(event, newInputValue) => {
                                handleChangeEmailExtension(newInputValue);
                              }}
                              id="controllable-states-demo"
                              options={options}
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" />
                              )}
                            />
                          </Grid>
                        </Grid>
                        <br></br>

                        <TextField
                          error={
                            (newContact !== false &&
                              contact === newContact &&
                              !alert) ||
                            newContact.length === 0
                              ? true
                              : false
                          }
                          inputProps={{ maxLength: 10 }}
                          helperText={
                            (newContact !== false &&
                              contact === newContact &&
                              !alert) ||
                            newContact.length === 0
                              ? "No se va ha realizar ningún cambio en contacto"
                              : null
                          }
                          id="outlined-multiline-flexible"
                          label="Contacto"
                          multiline
                          rowsMax={4}
                          defaultValue={contact}
                          onChange={handleChangeContact}
                          variant="outlined"
                        />
                        <br></br>
                      </>
                    ) : null}
                    {openUpdatePassword ? (
                      <>
                        <TextField
                          id="outlined-password-input"
                          label="Contraseña Actual"
                          type="password"
                          autoComplete="current-password"
                          variant="outlined"
                          onChange={handleChangeCurrentPassword}
                        />
                        <br />
                        <OutlinedInput
                          notched
                          className={classes.password}
                          error={
                            lowLevelSecurePass ||
                            password.length >= 30 ||
                            password.length === 0
                          }
                          id="outlined-password-input"
                          variant="outlined"
                          onChange={handleChangePassword}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClicShowPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label={
                            lowLevelSecurePass
                              ? "Debe tener más de 7 letras, una mayúscula y al menos un dígito numérico"
                              : "Contraseña"
                          }
                          type={showPassword ? "text" : "password"}
                          inputProps={{ maxLength: 30 }}
                        />
                        <OutlinedInput
                          notched
                          className={classes.password}
                          error={
                            confirmPassword && password !== confirmPassword
                              ? true
                              : false
                          }
                          type={showPassword2 ? "text" : "password"}
                          label={
                            confirmPassword && password !== confirmPassword
                              ? "Las contraseñas no coinciden"
                              : "Contraseña"
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClicShowPassword2}
                              >
                                {showPassword2 ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          id="outlined-password-input"
                          autoComplete="current-password"
                          variant="outlined"
                          onChange={handleChangeConfirmPassword}
                        />
                      </>
                    ) : null}
                    <br></br>
                    <Button
                      className={classes.button}
                      onClick={() => switchContentPassword()}
                      variant="contained"
                      color={openUpdatePassword ? "secondary" : "primary"}
                    >
                      {openUpdatePassword
                        ? "Cancelar"
                        : "Actualizar Contraseña"}
                    </Button>
                    {(!openUpdatePassword &&
                      newEmail.length > 5 &&
                      !alreadyRegister &&
                      newEmail &&
                      email !== newEmail) ||
                    (newContact && contact !== newContact) ||
                    (newImage && image !== newImage && !openUpdatePassword) ? (
                      <>
                        <Button
                          onClick={() => updateData()}
                          className={classes.button}
                          variant="contained"
                        >
                          Actualizar Datos
                        </Button>
                        <Button
                          onClick={() => window.location.reload()}
                          className={classes.button}
                          variant="contained"
                          color="secondary"
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : openUpdatePassword &&
                      currentPassword &&
                      confirmPassword &&
                      password === confirmPassword &&
                      !lowLevelSecurePass ? (
                      <Button
                        onClick={() => updateData()}
                        className={classes.button}
                        variant="contained"
                      >
                        Actualizar Contraseña
                      </Button>
                    ) : null}
                  </div>
                </form>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>
    );
  }
}
