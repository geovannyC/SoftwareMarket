import React, { useEffect, useState } from "react";
import PublicationList from "../PublicationList/publicationList";

import getData from "../../util/GET";
import { Typography } from "@material-ui/core";

export default function MainManager(props) {
  const [dataList, setDataList] = useState([]),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    fnGetData();
  }, []);

  const fnGetData = async () => {
    const url = "/publicaciones";
    await getData(url).then((content) => {
      if (content) {
        setDataList(content);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  const SchemmaPublicationList = () => {
    if (loading) {
      return <Typography>Cargando</Typography>;
    } else {
      let data = !props.search ? dataList : props.search;
      return (
        <div>
          {/* <Search inyector={this.searchYelp} /> */}

          <PublicationList dataList={data} />

          <div>{/* {()=>this.dataSearchBar()} */}</div>
        </div>
      );
    }
  };
  return <SchemmaPublicationList />;
}
