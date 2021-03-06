import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from "@material-ui/core/colors";
export const useButtonStyles = makeStyles(() => ({
    root: {
      fontFamily: "'Kanit', san-serif",
      fontWeight: 'bold',
      fontSize: 12,
    },
    text: {
      '&:hover': {
        backgroundColor: blueGrey[50],
      },
    },
    contained: {
      borderRadius: 40,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: blueGrey[50],
      color: blueGrey[700],
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
      '&:focus': {
        boxShadow: 'none',
      },
    },
    containedPrimary: {
      transition:
        '250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      backgroundColor: '#ffbd80',
      color: blueGrey[900],
      '&:hover': {
        backgroundColor: '#ABFA70',
      },
    },
  }));
  export const useStylesCard = makeStyles((theme) => ({
    root: {
      height: 180,
    },
    container: {
      display: 'flex',
    },
    paper: {
      margin: theme.spacing(1),
    },
    svg: {
      width: 100,
      height: 100,
    },
    polygon: {
      fill: theme.palette.common.white,
      stroke: theme.palette.divider,
      strokeWidth: 1,
    },

  }));
  export const useStyles = makeStyles(() => ({
    card: {
      border: '1px solid',
      borderColor: '#cfd8dc',
      borderRadius: 12,
      backgroundColor: '#fff',
    },
    container: {
      display: 'flex',
    },
    titleFont: {
      fontFamily: "'Kanit', san-serif",
      color: '#37474f',
    },
    header: {
      margin: 0,
      textAlign: 'center',
      fontSize: '1.25rem',
      letterSpacing: '1px',
    },
    ribbon: {
      textAlign: 'center',
      color: 'rgba(0,0,0,0.87)',
      letterSpacing: 1,
    },
  }));