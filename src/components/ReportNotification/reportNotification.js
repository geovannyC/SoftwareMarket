import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
export default function ReportNotification(props){
    
        const alert = props.notification
        if (!alert) {
          return null;
        } else if (alert === "loading") {
          return (
            <Snackbar
            open={alert}
            autoHideDuration={6000}
        
          >
              <Alert variant="filled" severity="warning">
                Actualizando...
              </Alert>
              </Snackbar>
          );
        } else if (alert === "success") {
          return (
            <Snackbar
            open={alert}
            autoHideDuration={6000}
     
          >
              <Alert variant="filled" severity="success">
                Actualizado exitosamente
              </Alert>
              </Snackbar>
          );
        } else {
          return (
            <Snackbar
            open={alert}
            autoHideDuration={6000}
      
          >
              <Alert variant="filled" severity="error">
                Error al actualizar, intentalo mas tarde
              </Alert>
              </Snackbar>
          );
        }
      
      
}
