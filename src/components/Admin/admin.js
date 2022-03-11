import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Drawer from "@material-ui/core/Drawer";
import InputAdornment from "@material-ui/core/InputAdornment";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TocIcon from "@material-ui/icons/Toc";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useStyles } from "./styleAdmin";

import AdminPublicaciones from "../AdminPublicaciones/listPublications";
import ListUsers from "../usuarios/listUsers";
import ListAdmins from "../listAdmins/listUsers";
import ListReports from "../ListReports/listReports";
import sendData from "../../util/POST";
import usuario from "../../util/GETTOK";

const urlFindEmail = `/findEmail`;
const urlRegister = "/registro";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Admin() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openMenu, setOpenMenu] = useState(false),
    [anchorEl, setAnchorEl] = useState(null),
    [redirect, setRedirect] = useState("publicaciones"),
    [openD, setOpenD] = useState(false),
    [alreadyRegister, setAlreadyRegister] = useState(false),
    [password, setPassword] = useState(""),
    [email, setEmail] = useState(false),
    [openN, setOpenN] = useState(false),
    [currentUser, setCurrentUser] = useState(false);
  const open = Boolean(anchorEl);
  useEffect(() => {
    getCurrentUser();
  }, []);
  const getCurrentUser = () => {
    const url = `/getPersonas/${localStorage.getItem("id")}`;
    usuario(url).then((data) => {
      if (!data || data === undefined || data.length === 0) {
        return null;
      } else {
        setCurrentUser(data);
      }
    });
  };
  const handleDrawerOpen = () => {
    setOpenMenu(true);
  };
  const handleNotificationSwitch = () => {
    openN ? setOpenN(false) : setOpenN(true);
  };
  const handleDrawerClose = () => {
    setOpenMenu(false);
  };
  const handleDigalogSwitch = () => {
    openD ? setOpenD(false) : setOpenD(true);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeEmail = async (event) => {
    let data = JSON.stringify({
      correo: event.target.value,
    });
    if (event.target.value.length === 0) {
      setEmail(false);
    } else {
      setEmail(event.target.value);
    }

    await sendData(data, urlFindEmail).then((response) => {
      console.log(response);
      if (response) {
        setAlreadyRegister(true);
      } else {
        setAlreadyRegister(false);
      }
    });
  };
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    localStorage.removeItem("state");
    localStorage.removeItem("token");
    window.location.reload();
  };
  const Redirect = () => {
    if (redirect === "publicaciones") {
      return <AdminPublicaciones />;
    } else if (redirect === "usuarios") {
      return <ListUsers />;
    } else if (redirect === "admins") {
      return <ListAdmins />;
    } else if (redirect === "reportes") {
      return <ListReports />;
    }
  };
  const generateRandomPass = () => {
    let characterList =
      "!@$%^&*()<>,.?/[]{}-=_+0123456789abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
    let passw = "";
    for (let i = 0; i < 25; ++i) {
      passw += characterList[getRandomInt(0, characterList.length - 1)];
    }
    return setPassword(passw);
  };
  const setLocalRegister = () => {
    let data = JSON.stringify({
      correo: email,
      contra: password,
      estado: "SuperUsuario",
    });

    sendData(data, urlRegister).then((response) => {
      if (response) {
        setOpenD(false);
        setPassword("");
        setOpenN("Creado exitosamente");
      } else {
        setOpenN("error servidor");
      }
    });
  };
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const profileDialog = (
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
          <TextField
            fullWidth
            error={alreadyRegister || email.length >= 30 || email.length === 0}
            label={
              alreadyRegister
                ? "El nombre de usuario ya ha sido registrado."
                : "Nombre de usuario"
            }
            id="outlined-adornment-weight"
            inputProps={{ maxLength: 30 }}
            onChange={handleChangeEmail}
            endAdornment={<InputAdornment position="end">{0}</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
          />
        </DialogContentText>
        {password ? (
          <DialogContentText>
            <Typography>{`Tu contraseña es: ${password}`}</Typography>
          </DialogContentText>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={generateRandomPass} color="primary">
          Generar contraseña
        </Button>
        {!alreadyRegister && password && email ? (
          <Button onClick={setLocalRegister} color="primary">
            Registrar
          </Button>
        ) : null}

        <Button onClick={handleDigalogSwitch} color="primary" autoFocus>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
  const notificationRegisterAdmin = (
    <div className={classes.root}>
      <Snackbar
        open={openN}
        autoHideDuration={6000}
        onClose={handleNotificationSwitch}
      >
        {openN === "error servidor" ? (
          <Alert onClose={handleNotificationSwitch} severity="warning">
            Error en el servidor, intentalo más tarde
          </Alert>
        ) : openN === "Creado exitosamente" ? (
          <Alert onClose={handleNotificationSwitch} severity="success">
            Creado éxitosamente!
          </Alert>
        ) : (
          <Alert onClose={handleNotificationSwitch} severity="error">
            Error, verifica la información.
          </Alert>
        )}
      </Snackbar>
    </div>
  );
  const appbar = (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: openMenu,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, openMenu && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          SUPER ADMINISTRADOR
        </Typography>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            {currentUser.correo === "admin" ? (
              <MenuItem onClick={handleDigalogSwitch}>
                Añadir un administrador
              </MenuItem>
            ) : null}

            <MenuItem onClick={logOut}>Cerrar sesión</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
  const drawerNav = (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={openMenu}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => setRedirect("publicaciones")}>
          <ListItemIcon>
            <TocIcon />
          </ListItemIcon>
          <ListItemText primary="Publicaciones" />
        </ListItem>
        <ListItem button onClick={() => setRedirect("usuarios")}>
          <ListItemIcon>
            <TocIcon />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItem>
        <ListItem button onClick={() => setRedirect("reportes")}>
          <ListItemIcon>
            <TocIcon />
          </ListItemIcon>
          <ListItemText primary="Reportes" />
        </ListItem>
        {currentUser.correo === "admin" ? (
          <ListItem button onClick={() => setRedirect("admins")}>
            <ListItemIcon>
              <TocIcon />
            </ListItemIcon>
            <ListItemText primary="Lista Administradores" />
          </ListItem>
        ) : null}
      </List>
      <Divider />
    </Drawer>
  );
  return (
    <div className={classes.root}>
      {profileDialog}
      {notificationRegisterAdmin}
      <CssBaseline />
      {appbar}
      {drawerNav}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openMenu,
        })}
      >
        <div className={classes.drawerHeader} />
        {Redirect()}
      </main>
    </div>
  );
}
