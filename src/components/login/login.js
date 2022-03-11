import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styleLogin";
import Autocomplete from "@material-ui/lab/Autocomplete";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import MuiAlert from "@material-ui/lab/Alert";
import estadoPublicacion from "../../util/POSTTOK";

import ReportNotification from "../ReportNotification/reportNotification";
import sendData from "../../util/POST";
import getData from "../../util/GET";
import { IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

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
export default function LoginMaterial() {
  const [user, setUser] = useState(null),
    [password, setPassword] = useState(false),
    [passwordAdmin, setPasswordAdmin] = useState(false),
    [redirect, setRedirect] = useState("login"),
    [name, setName] = useState(false),
    [lastName, setLastName] = useState(false),
    [email, setEmail] = useState(false),
    [firstPassword, setFirstPassword] = useState(false),
    [secondPassword, setSecondPassword] = useState(false),
    [phone, setPhone] = useState(false),
    [ide, setIde] = useState(false),
    [statusAu, setStatusAu] = useState(true),
    [alreadyRegister, setAlreadyRegister] = useState(false),
    [value, setValue] = useState(options[0]),
    [lowLevelSecurePass, setLowLevelSecurePass] = useState(false),
    [ideAlreadyRegister, setideAlreadyRegister] = useState(false),
    [isIdeValid, setIsIdeValid] = useState(true),
    [showPassword, setShowPassword] = useState(false),
    [showPassword2, setShowPassword2] = useState(false),
    [
      handleChangeStatusRecovery,
      sethandleChangeStatusRecovery,
    ] = useState(false),
    [openD, setOpenD] = useState(false),
    [alert, setAlert] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const handleDigalogSwitch = () => {
    openD ? setOpenD(false) : setOpenD(true);
  };
  const generateRandomPass = () => {
    let characterList =
      "!@$%^&*()<>,.?/[]{}-=_+0123456789abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
    let passw = "";
    for (let i = 0; i < 25; ++i) {
      passw += characterList[getRandomInt(0, characterList.length - 1)];
    }
    setPasswordAdmin(passw);
    return passw;
  };
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const handleChangeEmailExtension = (value) => {
    const checkInput = options.find((extension) => extension === value)
      ? setValue(value)
      : false;
    return checkInput;
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleChangeEmail = async (event) => {
    let data;
    const url = "/findEmail";
    data = JSON.stringify({
      correo: `${event.target.value}${value}`,
    });
    if (event.target.value.length === 0) {
      setEmail("");
    } else {
      setEmail(`${event.target.value}${value}`);
    }

    await sendData(data, url).then((data) => {
      if (data) {
        console.log("usuario registrado");
        setAlreadyRegister(true);
      } else {
        console.log("usuario no registrado");
        setAlreadyRegister(false);
      }
    });
  };
  const handleChangeFisrtPassword = (event) => {
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (event.target.value.match(passw)) {
      setLowLevelSecurePass(false);
    } else {
      setLowLevelSecurePass(true);
    }
    setFirstPassword(event.target.value);
  };
  const handleChangeSecondPassword = (event) => {
    setSecondPassword(event.target.value);
  };
  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleChangeIde = (event) => {
    var cad = event.target.value;
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;
    if (cad !== "" && longitud === 10) {
      for (var i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
          var aux = cad.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cad.charAt(i));
        }
      }

      total = total % 10 ? 10 - (total % 10) : 0;

      if (cad.charAt(longitud - 1) == total) {
        const url = `/getById/${event.target.value}`;
        setIsIdeValid(true);
        getData(url).then((response) => {
          if (response) {
            setideAlreadyRegister(true);
          } else {
            setideAlreadyRegister(false);
          }
        });
      } else {
        setIsIdeValid(false);
      }
    }
    setIde(event.target.value);
  };

  const handlechangelogin = (value) => {
    setIde(false);
    setRedirect(value);
  };

  const setLocal = async () => {
    const url = "/login";
    const data = JSON.stringify({
      correo: user,
      contra: password,
    });
    await sendData(data, url).then((response) => {
      if (response === "admin no creado") {
        setOpenD(true);
      } else {
        if (!response) {
          setStatusAu(false);
        } else {
          if (response.datos["estado"] === "SuperUsuario") {
            localStorage.setItem("id", response.datos["_id"]);
            localStorage.setItem("token", String(response.token));
            window.location.reload();
          } else {
            localStorage.setItem("id", response.datos["_id"]);
            localStorage.setItem("user", String(response.datos["nombre"]));
            localStorage.setItem("token", String(response.token));
            window.location.reload();
          }
        }
      }
    });
  };
  const handleClicShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };
  const handleClicShowPassword2 = () => {
    showPassword2 ? setShowPassword2(false) : setShowPassword2(true);
  };
  const setLocalRegister = () => {
    setAlert("loading")
    let data;
    const url = "/registro";
    if (!passwordAdmin) {
      data = JSON.stringify({
        nombre: name,
        apellido: lastName,
        telefono: phone,
        cedula: ide,
        correo: email,
        contra: firstPassword,
        estado: "Por_Revisar",
      });
    } else if (passwordAdmin) {
      data = JSON.stringify({
        correo: "admin",
        contra: passwordAdmin,
        estado: "SuperUsuario",
      });
    }
    estadoPublicacion(data, url).then((data) => {
      console.log(data);
      if (data) {
        setRedirect("login");
        setOpenD(false);
        setAlert("success")
        setTimeout(() => {
          setAlert(false)
        }, 2000);
      } else {
        setAlert("error servidor");
        setTimeout(() => {
          setAlert(false)
        }, 2000);
      }
    });
  };
  const recoveryAccount = () => {
    const url = "/recoveryAccount";
    const data = JSON.stringify({
      ide: ide,
      provitionalPassword: generateRandomPass(),
    });
    estadoPublicacion(data, url).then((response) => {
      if (!response) {
        sethandleChangeStatusRecovery(false);
      } else {
        sethandleChangeStatusRecovery(true);
        setEmail(response);
      }
    });
    setRedirect("statusRecovery");
  };

  const dialogRegisterAdmin = (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openD}
        onClose={handleDigalogSwitch}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Crea un perfil de adminitrador"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Hola tu nombre de usuario es: admin, genera una contraseña para
              continuar con tu registro
            </Typography>
          </DialogContentText>
          {passwordAdmin ? (
            <DialogContentText>
              <Typography>{`Tu contraseña es: ${passwordAdmin}`}</Typography>
            </DialogContentText>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={generateRandomPass} color="primary">
            Generar contraseña
          </Button>
          {passwordAdmin ? (
            <Button
              onClick={() => setLocalRegister()}
              color="primary"
              autoFocus
            >
              Registrar
            </Button>
          ) : null}

          <Button onClick={handleDigalogSwitch} color="primary" autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

 
  const loginForm =
    redirect === "login" ? (
      <div className={classes.paper}>
        <Typography
          onClick={() => window.location.reload()}
          style={{ cursor: "pointer" }}
          className="Logo2"
          component="h1"
          variant="h5"
        >
          SM
        </Typography>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className="Logo2" component="h1" variant="h5">
          Login
        </Typography>

        <form>
          <div>
            <TextField
              error={!statusAu}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              error={!statusAu}
              className="Pass"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={
                !statusAu ? "Usuario o Contraseña Incorrectos" : false
              }
              onChange={handleChangePassword}
            />
          </div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => setLocal()}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                onClick={() => handlechangelogin("recovery")}
                variant="body2"
                style={{ cursor: "pointer" }}
              >
                {"Olvidaste tu contraseña"}
              </Link>
            </Grid>
            <Grid item>
              <Link
                onClick={() => handlechangelogin("register")}
                variant="body2"
                style={{ cursor: "pointer" }}
              >
                {"No tienes una cuenta, registrate aquí..."}
              </Link>
            </Grid>
          </Grid>

          <Box mt={5}></Box>
        </form>
      </div>
    ) : null;
  const registerForm =
    redirect === "register" ? (
      <div className={classes.paper}>
        <Typography
          onClick={() => window.location.reload()}
          style={{ cursor: "pointer" }}
          className="Logo2"
          component="h1"
          variant="h5"
        >
          SM
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className="Logo2" component="h1" variant="h5">
          Registro
        </Typography>
        <form>
          <TextField
            error={name.length >= 25 || name.length === 0 ? true : false}
            variant="outlined"
            margin="normal"
            type="text"
            required
            fullWidth
            id="name"
            label="Nombres"
            name="name"
            autoComplete="name"
            onChange={handleChangeName}
            inputProps={{ maxLength: 25 }}
            helperText={
              name.length >= 25 ? "Tienes un máximo de 25 letras" : null
            }
          />
          <TextField
            error={
              lastName.length >= 25 || lastName.length === 0 ? true : false
            }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Apellidos"
            name="lastName"
            autoComplete="additional-name"
            onChange={handleChangeLastName}
            inputProps={{ maxLength: 25 }}
            helperText={
              lastName.length >= 25 ? "Tienes un máximo de 25 letras" : null
            }
          />
          <TextField
            error={phone.length >= 10 || phone.length === 0 ? true : false}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            id="phone"
            label="Teléfono"
            name="phone"
            autoComplete="tel"
            onChange={handleChangePhone}
            inputProps={{ maxLength: 10 }}
            helperText={
              phone.length >= 10 ? "Tienes un máximo de 10 numeros" : null
            }
          />
          <TextField
            error={!isIdeValid || ideAlreadyRegister}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            id="ide"
            label={
              ideAlreadyRegister
                ? `El número de cedula ya ha sido registrado`
                : "Cédula"
            }
            name="ide"
            autoComplete="cc-number"
            onChange={handleChangeIde}
            inputProps={{ maxLength: 10 }}
            helperText={!isIdeValid ? "Ingresa una cédula válida" : null}
          />
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <OutlinedInput
                fullWidth
                notched
                error={
                  alreadyRegister || email.length >= 30 || email.length === 0
                }
                helperText={
                  alreadyRegister ? "El correo ya ha sido registrado." : null
                }
                label={
                  alreadyRegister
                    ? "El correo ya ha sido registrado."
                    : "Correo"
                }
                className={classes.inputEmail}
                id="outlined-adornment-weight"
                inputProps={{ maxLength: 30 }}
                onChange={handleChangeEmail}
                endAdornment={
                  <InputAdornment position="end">{value}</InputAdornment>
                }
                // aria-describedby="outlined-weight-helper-text"
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                error={value === null || value === "" || !value}
                fullWidth
                value={value}
                onInputChange={(event, newInputValue) => {
                  handleChangeEmailExtension(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                className={classes.autocompleteEmail}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </Grid>
          </Grid>

          <OutlinedInput
            notched
            error={
              lowLevelSecurePass ||
              firstPassword.length >= 30 ||
              firstPassword.length === 0
            }
            className={classes.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={
              lowLevelSecurePass
                ? "Debe tener más de 7 letras, una mayúscula y al menos un dígito numérico"
                : "Contraseña"
            }
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            onChange={handleChangeFisrtPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClicShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            inputProps={{ maxLength: 30 }}
          />
          <OutlinedInput
            notched
            error={
              secondPassword.length >= 30 ||
              secondPassword.length === 0 ||
              (secondPassword && firstPassword !== secondPassword)
            }
            className={classes.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={
              secondPassword && firstPassword !== secondPassword
                ? "Las contraseñas no coinciden"
                : "Repite la contraseña"
            }
            type={showPassword2 ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            onChange={handleChangeSecondPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClicShowPassword2}
                >
                  {showPassword2 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            inputProps={{ maxLength: 30 }}
          />
          {!name ||
          !isIdeValid ||
          ideAlreadyRegister ||
          !lastName ||
          !phone ||
          !ide ||
          !email ||
          !firstPassword ||
          !secondPassword ||
          alreadyRegister ||
          name.length === 0 ||
          lastName.length === 0 ||
          phone.length === 0 ||
          ide.length === 0 ||
          ide.length < 10 ||
          email.length === 0 ||
          !value ||
          lowLevelSecurePass ||
          firstPassword.length === 0 ||
          secondPassword.length === 0 ||
          (secondPassword && firstPassword !== secondPassword) ? null : (
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => setLocalRegister()}
            >
              Registrarse
            </Button>
          )}

          <Grid container>
            <Grid item>
              <Link onClick={() => handlechangelogin("login")} variant="body2">
                {"Ya tienes una cuenta?"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}></Box>
        </form>
      </div>
    ) : null;
  const recoveryAccountForm =
    redirect === "recovery" ? (
      <div className={classes.paper}>
        <Typography
          onClick={() => window.location.reload()}
          style={{ cursor: "pointer" }}
          className="Logo2"
          component="h1"
          variant="h5"
        >
          SM
        </Typography>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className="Logo2" component="h1" variant="h5">
          Recupera tu cuenta
        </Typography>

        <form>
          <div>
            <TextField
              error={!isIdeValid}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="ide"
              label="Número de cédula"
              name="ide"
              autoComplete="cc-number"
              onChange={handleChangeIde}
              inputProps={{ maxLength: 10 }}
              helperText={!isIdeValid ? "Número de cédula inválido" : null}
            />
          </div>

          <Button
            disabled={ide.length !== 10 || !isIdeValid}
            fullWidth
            variant="contained"
            color="primary"
            onClick={recoveryAccount}
          >
            Recuperar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                onClick={() => handlechangelogin("login")}
                variant="body2"
                style={{ cursor: "pointer" }}
              >
                {"Login"}
              </Link>
            </Grid>
            {/* <Grid item>
            <Link
              onClick={handlechangelogin}
              variant="body2"
              style={{ cursor: "pointer" }}
            >
              {"No tienes una cuenta, registrate aquí..."}
            </Link>
          </Grid> */}
          </Grid>

          <Box mt={5}></Box>
        </form>
      </div>
    ) : null;
  const statusRecovery =
    redirect === "statusRecovery" ? (
      <div className={classes.paper}>
        <Typography
          onClick={() => window.location.reload()}
          style={{ cursor: "pointer" }}
          className="Logo2"
          component="h1"
          variant="h5"
        >
          SM
        </Typography>

        <Avatar className={classes.avatar}>
          {handleChangeStatusRecovery ? <CheckCircleIcon /> : <ErrorIcon />}
        </Avatar>
        <Typography className="Logo2" component="h1" variant="h5">
          {handleChangeStatusRecovery
            ? `¡Éxito! se ha enviado un correo a ${email} para poder recuperar tu cuenta`
            : `El número de cédula no coincide con ninguna cuenta registrada, por favor verifícalo CI:${ide}`}
        </Typography>

        <Grid container spacing={3}>
          <Grid item>
            <Link
              onClick={() => handlechangelogin("login")}
              variant="body2"
              style={{ cursor: "pointer" }}
            >
              {"Login"}
            </Link>
          </Grid>
          <Grid item>
            <Link
              onClick={() => handlechangelogin("recovery")}
              variant="body2"
              style={{ cursor: "pointer" }}
            >
              {"Regresar"}
            </Link>
          </Grid>
        </Grid>

        <Box mt={5}></Box>
      </div>
    ) : null;
  return (
    <>
      <Grid fullscreen container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {loginForm}
          {registerForm}
          {recoveryAccountForm}
          {statusRecovery}
        </Grid>
      </Grid>
      {dialogRegisterAdmin}
      <ReportNotification notification={alert}/>
    </>
  );
}
