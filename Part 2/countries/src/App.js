import React, { useState, useEffect } from "react";
import axios from "axios";
import CountriesInfo from "./components/CountriesInfo";
import Filter from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterParam, setFilterParam] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const list =
    filterParam.length === 0
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().match(filterParam.toLowerCase())
        );

  return (
    <div>
      <Filter {...{ filterParam, setFilterParam }} />
      <CountriesInfo list={list} />
    </div>
  );
}

export default App;
