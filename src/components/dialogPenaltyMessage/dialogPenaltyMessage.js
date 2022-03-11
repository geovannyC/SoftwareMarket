import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "../AdminPublicaciones/styleList";

import estadoPublicacion from "../../util/POSTTOK";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DialogPenaltyMesaage(props) {
  const [open, setOpen] = useState(false),
    [content, setContent] = useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };
  const sendNotification = () => {
    const url = "/sendnotification";
    const data = JSON.stringify({
      content: content,
      email: props.datauser,
    });
    estadoPublicacion(data, url ).then((response) => {
      if (response) {
        props.sendNotification();
        setOpen(false);
      }
    });
  };

  return (
    <div > 
      <Button
       variant="contained"
       color="primary"
        className={classes.buttonNotification}
        onClick={handleClickOpen}
      >
        Notificar
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {`Formulario de diálogo para: ${props.data}`}
        </DialogTitle>
        <DialogContent>
          <TextField
            error
            className={classes.rootTextfield}
            id="outlined-multiline-static"
            label="Detalle de la sanción"
            multiline
            rows={6}
            variant="outlined"
            onChange={handleChangeContent}
            inputProps={{ maxLength: 1250 }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={sendNotification} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
