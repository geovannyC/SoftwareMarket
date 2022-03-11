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

export default function DialogReportMesaage(props) {
 
  const  [content, setContent] = useState(false);
  const classes = useStyles();

  const handleClose = () => {
    props.statusReport()
  };
  const handleChangeContent = (event) => {
    
    setContent(event.target.value);
  };
  const sendNotification = async() => {
    props.statusNotification("loading")
    
    const url = props.data.url;
    const id = props.data.id
    let data;
    if(url==='/reportPublication'){
      data = JSON.stringify({
        _id: id,
        reporteempresa: content
      });
    }else{
      data = JSON.stringify({
        _id: id,
        reportecliente: content
      });
    }
  
    console.log( id, content, url)
    if(!url || !id || !content ){
      props.statusNotification("Error Servidor");
    }else{
      await estadoPublicacion(data, url ).then((response) => {
        if (response) {
          props.statusNotification("success");
          handleClose()
        }else{
          props.statusNotification("Error Servidor");
          handleClose()
        }
      });
    }
  };

  return (
    <div >

      <Dialog
        open={props.data.open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {`Enviar reporte de la publicación: ${props.data.name}`}
        </DialogTitle>
        <DialogContent>
          <TextField
            error
            className={classes.rootTextfield}
            id="outlined-multiline-static"
            label={content.length===600?"Tienes un máximo de 600 Letras": "Detalle de la sanción"}
            multiline
            rows={6}
            variant="outlined"
            onChange={handleChangeContent}
            inputProps={{ maxLength: 600 }}
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
