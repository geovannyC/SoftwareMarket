import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useStyles } from "./styleNavigator";
import { useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Alert from "@material-ui/lab/Alert";

import Search from "./search";
import LoginMaterial from "../login/login";
import MainManager from "../MainManager/mainManager";
import ListaSells from "../ventas/listSells";
import BuyList from "../BuyList/BuyList";
import MiddlePolitics from "../publicar/middlePolitics";
import Publicaciones from "../PublicacionesUsuario/publicacionesUsuario";
import Admin from "../Admin/admin";
import Profile from "../profile/profile";

import usuario from "../../util/GETTOK";
import estadoPublicacion from "../../util/POSTTOK";
import getData from "../../util/GET";
import ReportNotification from "../ReportNotification/reportNotification";
import deleted from "../../assets/delete.png"
export default function Navigator() {
  const [anchorEl, setAnchorEl] = useState(null),
    [anchorElNotifications, setAnchorElNotifications] = useState(null),
    [open, setOpen] = useState(false),
    [dialogBell, setDialogBell] = useState(false),
    [data, setData] = useState(null),
    [dataNotifications, setDataNotifications] = useState(null),
    [numberNotifications, setNumberNotifications] = useState(null),
    [redirect, setRedirect] = useState("inicio"),
    [alertEmptyGet, setAlertEmptyGet] = useState(false),
    [loading, setLoading] = useState(true),
    [dataUser, setDataUser] = useState(false),
    [alert, setAlert] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
    setNotifications();
    getUser();
  }, []);

  const getUser = () => {
    const url = `/getPersonas/${localStorage.getItem("id")}`;
    if (!dataUser) {
      if (localStorage.getItem("id")) {
        usuario(url)
          .then((data) => {
            console.log(data);
            if (data.estado === "SuperUsuario") {
              return true;
            } else {
              return false;
            }
          })
          .then((result) => {
            if (result) {
              setDataUser(true);
              console.log("exito");
            }
          });
      }
    }
    setLoading(false);
  };
  const setNotifications = async () => {
    const url = "/publicaciones";
    const urlNotifications = `/notificaciones/${localStorage.getItem("id")}`;
    if (localStorage.getItem("id") !== null) {
      let count = 0;
      getData(url).then((contenido) => {
        if (!contenido) {
          return null;
        }
      });

      usuario(urlNotifications).then((contenido) => {
        if (!contenido) {
          setDataNotifications(false);
        } else {
          try {
            contenido.map((contenido) => {
              if (contenido.estado === "norevisado") {
                return (count += 1);
              }
            });
            setDataNotifications(contenido);
            setNumberNotifications(count === 0 ? null : count);
          } catch (error) {
            return null;
          }
        }
      });
    }
  };

  const AlertUpdate = () => {
    if (!alertEmptyGet) {
      return null;
    } else if (alertEmptyGet === "loading") {
      return (
        <div className={classes.rootAlert}>
          <Alert variant="filled" severity="warning">
            Buscando publicación...
          </Alert>
        </div>
      );
    } else if (alertEmptyGet === "error") {
      return (
        <div className={classes.rootAlert}>
          <Alert variant="filled" severity="error">
            Error no hemos encontrado ninguna publicación
          </Alert>
        </div>
      );
    } else {
      return null;
    }
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleBellMenuOpen = async (event) => {
    setAlert("loading")
    const url = "/actualizarnoti";
    const data = JSON.stringify({
      _id: localStorage.getItem("id"),
    });
    if (numberNotifications != null) {
      await estadoPublicacion(data, url).then((response) => {
        if (!response) {
          setAlert("Error al actualizar")
          setTimeout(() => {
            setAlert(false)
          }, 1000);
        } else {
          setAlert("success");
          setTimeout(() => {
            setAlert(false)
          }, 1000);
        }
      });
    }
    setAnchorElNotifications(event.currentTarget);
    setNumberNotifications(null);
    handleBellClose();
    setTimeout(() => {
      setAlert(false)
    }, 1000);
  };
  const handleBellClose = () => {
    dialogBell ? setDialogBell(false) : setDialogBell(true);
  };
  const handleDataSearch = (data) => {
    if (data === "error" || data === "loading") {
      setAlertEmptyGet(data);
    } else {
      setData(data);
      setAlertEmptyGet(data);
    }
  };
  const Redirect = () => {
    if (redirect === "inicio") {
      if (!data) {
        return <MainManager />;
      } else {
        return <MainManager search={data} />;
      }
    } else if (redirect === "publicar") {
      return <MiddlePolitics />
    } else if (redirect === "ventas") {
      return <ListaSells />;
    } else if (redirect === "compras") {
      return <BuyList />;
    } else if (redirect === "publicaciones") {
      return <Publicaciones />;
    } else if (redirect === "perfil") {
      return <Profile />;
    }
  };
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    localStorage.removeItem("state");
    localStorage.removeItem("token");
    return (window.location.href = "http://localhost:3000/");
  };
  const deleteNotification = (id) => {
    setAlert("loading")
    const data = JSON.stringify({
      id: id,
    });
    const url = "/deleteNotificacion";
    estadoPublicacion(data, url).then((content) => {
      if (content) {
        setNotifications()
        setAlert("success")
        setTimeout(() => {
          setAlert(false)
        }, 1000);
      } else {
        setAlert("Error servidor")
        setTimeout(() => {
          setAlert(false)
        }, 1000);
      }
    });
  };
  const menuId = "primary-search-account-menu";
  const menuAlert = "alertid";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => setRedirect("perfil")}>Perfil</MenuItem>
      <MenuItem onClick={() => logOut()}>Cerrar sessión</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const RenderBellMenu = () => {
    if (dataNotifications === null) {
      return null;
    } else {
      if (!dataNotifications) {
        return (
          <Menu
            anchorEl={anchorElNotifications}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuAlert}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={dialogBell}
            onClose={handleBellClose}
          >
            <Typography> No tiene notificaciones aún</Typography>
          </Menu>
        );
      } else {
        return (
          <Menu
            anchorEl={anchorElNotifications}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuAlert}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={dialogBell}
            onClose={handleBellClose}
          >
            {dataNotifications.map((content) => {
              if (content.publicacion === null) {
                return (
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={deleted}
                          className={classes.bigAvatar}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`La Publicación ha sido eliminada`}
                      />
                    </ListItem>
                  </List>
                );
              } else {
                return (
                  <List>
                    <ListItem button onClick={()=>deleteNotification(content._id)}>
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={content.publicacion.idimagen}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`Haz vendido ${content.publicacion.nombreproducto}`}
                      />
                    </ListItem>
                  </List>
                );
              }
            })}
          </Menu>
        );
      }
    }
  };
  const switchRoleLogin = () => {
    if (loading) {
      return <Typography>Cargando...</Typography>;
    } else {
      if (!dataUser) {
        if (redirect !== "login") {
          return (
            <>
              <div className={classes.root}>
                <CssBaseline />
                <AppBar
                  position="fixed"
                  className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                  })}
                >
                  <Toolbar>
                    {localStorage.getItem("user") !== null ? (
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(
                          classes.menuButton,
                          open && classes.hide
                        )}
                      >
                        <MenuIcon />
                      </IconButton>
                    ) : null}

                    <Typography
                      className={classes.title}
                      variant="h6"
                      noWrap
                      onClick={() => window.location.reload()}
                    >
                      Software Market
                    </Typography>

                    <Search inyect={handleDataSearch} />
                    {localStorage.getItem("user") != null ? (
                      <IconButton
                        aria-label="show 17 new notifications"
                        color="inherit"
                        aria-controls={menuAlert}
                        aria-haspopup="true"
                        onClick={handleBellMenuOpen}
                      >
                        <Badge
                          badgeContent={
                            numberNotifications === null
                              ? null
                              : numberNotifications
                          }
                          color="secondary"
                        >
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                    ) : null}

                    {localStorage.getItem("user") != null ? (
                      <>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                          <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                          >
                            {localStorage.getItem("image") != null ? (
                              <Avatar
                                alt="Remy Sharp"
                                src={localStorage.getItem("image")}
                              />
                            ) : (
                              <AccountCircle />
                            )}
                          </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                          <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                          >
                            <MoreIcon />
                          </IconButton>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={classes.sectionDesktop}>
                          <IconButton
                            aria-label="show more"
                            onClick={() => setRedirect("login")}
                            color="inherit"
                          >
                            Ingresar
                          </IconButton>
                        </div>

                        <div className={classes.sectionMobile}>
                          <IconButton
                            aria-label="show more"
                            aria-haspopup="true"
                            onClick={() => setRedirect("login")}
                            color="inherit"
                          >
                            <ArrowRightAltIcon />
                          </IconButton>
                        </div>
                      </>
                    )}
                  </Toolbar>
                  <AlertUpdate className={classes.alertupdate} />
                </AppBar>

                <Drawer
                  className={classes.drawer}
                  variant="persistent"
                  anchor="left"
                  open={open}
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
                    <ListItem button onClick={() => setRedirect("inicio")}>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Inicio" />
                    </ListItem>
                  </List>
                  <Divider />
                  <List>
                    <ListItem button onClick={() => setRedirect("publicar")}>
                      <ListItemIcon>
                        <AddToQueueIcon />
                      </ListItemIcon>
                      <ListItemText primary="Publicar" />
                    </ListItem>
                    <ListItem button onClick={() => setRedirect("ventas")}>
                      <ListItemIcon>
                        <MonetizationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary="Mis Ventas" />
                    </ListItem>
                    <ListItem button onClick={() => setRedirect("compras")}>
                      <ListItemIcon>
                        <ShoppingCartIcon />
                      </ListItemIcon>
                      <ListItemText primary="Mis Compras" />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => setRedirect("publicaciones")}
                    >
                      <ListItemIcon>
                        <AccountTreeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Mis Publicaciones" />
                    </ListItem>

                    <Card>
                      <CardMedia
                        className={classes.media}
                        image="https://source.unsplash.com/random"
                        title="Paella dish"
                        onClick={() =>
                          window.open("https://source.unsplash.com/random")
                        }
                      />
                    </Card>
                  </List>
                </Drawer>
                <main
                  className={clsx(classes.content, {
                    [classes.contentShift]: open,
                  })}
                >
                  <div className={classes.drawerHeader} />
                  {Redirect()}
                </main>

                {renderMenu}
                {RenderBellMenu()}
                <ReportNotification notification={alert}/>
              </div>
            </>
          );
        } else {
          return <LoginMaterial />;
        }
      } else {
        return <Admin />;
      }
    }
  };
  return switchRoleLogin();
}
