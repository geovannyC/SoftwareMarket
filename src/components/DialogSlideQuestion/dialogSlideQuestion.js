import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { useStyles } from "./style";

import sendDeleteReport from "../../util/POSTTOK";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogSlideQuestion(props) {
    const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteReport =(id)=>{
    props.messageStatusDeletedReport("loading")
      const url = '/eliminareporte'
        const data = JSON.stringify({
            _id: id,
            reportecliente: 'Revisado',
            reporteempresa: 'Revisado'
        })
        sendDeleteReport(data, url).then((response)=>{
            if(response){
                setOpen(false);
                props.messageStatusDeletedReport("success")
                setTimeout(() => {
                    props.messageStatusDeletedReport(false)
                }, 2000);
            }else{
                setOpen(false);
                props.messageStatusDeletedReport("error al actualizar")
                setTimeout(() => {
                    props.messageStatusDeletedReport(false)
                }, 2000);
            }
        })
  }
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen} className={classes.disable}>
        Eliminar Reporte
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{`Estás seguro de eliminar el reporte de ${props.name}`}</DialogTitle>
        <DialogActions>
          <Button onClick={()=>deleteReport(props.id)} color="secondary">
            Eliminar
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
