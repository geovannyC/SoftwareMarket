import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useStyles } from "./styleNavigator";

import search from "../../util/POSTTOK";
import getData from "../../util/GET";

export default function Search(props) {
  const [dataInput, setDataInput] = useState([]),
    [loading, setLoading] = useState(true),
    [inputValue, setInputValue] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    getListPublications();
  }, []);
  const getListPublications = () => {
    const url = "/publicaciones";
    getData(url).then((contenido) => {
      if (contenido) {
        const dataFilter = [];
        contenido.map((publicacion) => {
          if (publicacion.estadopublicacion !== "Pendiente") {
            dataFilter.push(publicacion);
          }
        });
        setDataInput(dataFilter);
        setLoading(false);
      }
    });
  };
  function filterItems(needle, heystack) {
    let query = needle.toLowerCase();
    let result = heystack.filter(
      (item) => item.toLowerCase().indexOf(query) >= 0
    );
    return result;
  }
  const formatDataYelp = async (city, word) => {
    console.log(city, word);
    if (!city && !word) {
      console.log("error");
      props.inyect("error");
    } else {
      let data = JSON.stringify({
        city: city ? city : "any",
        word: word ? word : "any",
      });
      const url = "/search";
      await search(data, url).then((data) => {
        if (!data) {
          props.inyect("error");
        } else {
          props.inyect(data);
        }
      });
    }
  };
  function formatWords(text) {
    return new Promise((resolve) => {
      resolve(text.replace(/[^a-zA-Z ]/g, "").toLowerCase());
    });
  }

  const findSimilar = async (data, dataCities, dataWords) => {
    let citiResult = false;
    let wordResult = false;
    data.find((element) => {
      let result = filterItems(element, dataCities);
      let result1 = filterItems(element, dataWords);
      result.length > 0 ? (citiResult = result) : console.log("any");
      result1.length > 0 ? (wordResult = result1) : console.log("any");
    });
    formatDataYelp(citiResult, wordResult);
    return wordResult;
  };

  const searchAction = async (params) => {
    props.inyect("loading");
    if (
      (params != null && params.nombreproducto != null) ||
      (inputValue != null && inputValue != "")
    ) {
      let input =
        params != null
          ? params.nombreproducto != null
            ? params.nombreproducto
            : inputValue
          : inputValue;

      let textwithNoDigits = await formatWords(input);
      console.log(textwithNoDigits);
      let dataCitiesFormatted = dataInput.map((element) => element.ciudad);
      let dataWordsFormatted = dataInput.map(
        (element) => element.nombreproducto
      );
      textwithNoDigits = textwithNoDigits.split(" ");

      await findSimilar(
        textwithNoDigits,
        dataCitiesFormatted,
        dataWordsFormatted
      );
    } else {
      props.inyect(null);
    }
  };
  const handleChangeDataInputValue = (value) => {
    if (value !== "") {
      setInputValue(value);
    }
  };
  if (loading) {
    return (
      <TextField
        className={classes.navDS}
        variant="outlined"
        label="cargando..."
      />
    );
  } else {
    return (
      <Autocomplete
        id="combo-box-demo"
        freeSolo
        className={classes.nav}
        onChange={(event, value) => {
          searchAction(value);
        }}
        onInputChange={(event, value) => {
          handleChangeDataInputValue(value);
        }}
        options={loading ? "cargando" : dataInput}
        getOptionLabel={(option) =>
          option
            ? dataInput.length === 0 ||
              dataInput === "no hay publicaciones activas"
              ? []
              : option.nombreproducto
            : null
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Buscar" />
        )}
      />
    );
  }
}
