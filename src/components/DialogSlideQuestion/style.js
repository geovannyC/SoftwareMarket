import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    
    disable: {
        // color: theme.palette.getContrastText(purple[500]),
        backgroundColor: "#F99F9F ",
        '&:hover': {
          backgroundColor: "#EE4F4F ",
        },
      },
  }));