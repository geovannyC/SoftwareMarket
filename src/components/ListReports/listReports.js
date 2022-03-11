import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useStyles } from "./styleReport";
import { Typography } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

import SchemmaReport from "./schemmaReport";
import ReportNotification from "../ReportNotification/reportNotification";
import usuarios from "../../util/GETTOK";
import estadoPublicacion from "../../util/POSTTOK";

const yellow = "#ffffbf";

const theme = createTheme();
theme.typography.h3 = {
  fontSize: "0.7rem",
  "@media (min-width:600px)": {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
};
export default function ListUsers() {
  const [data, setData] = useState(null),
    [loading, setLoading] = useState(true),
    [alert, setAlert] = useState(false);
  useEffect(() => {
    getData();
  }, [!data]);
  const getData = async () => {
    const url = "/listaventas";
    await usuarios(url)
      .then((data) => {
        return data;
      })
      .then(async (result) => {
        if (result) {
          let cont = result.sort();
          await setData(cont.reverse());
          setLoading(false);
        } else {
          setAlert("error al actualizar");
          setLoading(false);
        }
      });
  };
  const statusNotification = (status) => {
    setAlert(status);
    getData();
  };
  const setUpdateData = async (data, url) => {
    setAlert("loading");

    console.log(data, url);

    await estadoPublicacion(data, url).then((response) => {
      if (response) {
        getData();
        setAlert("success");
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      } else {
        setAlert("error al actualizar");
      }
    });
  };
  const classes = useStyles();
  if (loading) {
    return <Typography>Cargando</Typography>;
  }
  if (data === "no hay usuarios activos") {
    return <Typography>No hay usuarios activos</Typography>;
  } else {
    return (
      <>
        <ReportNotification notification={alert} />
        <List className={classes.root} subheader={<li />}>
          <li className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader
                style={{ background: yellow }}
              >{`Sección Reportes`}</ListSubheader>
              {data.map((sell) => {
                if (
                  (sell.reportecliente === "Pendiente" &&
                    sell.reporteempresa === "Pendiente") ||
                  (sell.reporteempresa === "Revisado" &&
                    sell.reporteempresa === "Revisado")
                ) {
                  return null;
                } else {
                  return (
                    <SchemmaReport
                      data={sell}
                      setUpdateData={setUpdateData}
                      statusNotification={statusNotification}
                    />
                  );
                }
              })}
            </ul>
          </li>
        </List>
      </>
    );
  }
}
