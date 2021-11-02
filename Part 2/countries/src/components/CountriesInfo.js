import React, { useState } from "react";
import CountryDetail from "./CountryDetail";

const Country = ({ country }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <li>
        <p>
          {country.name.common}{" "}
          <button onClick={() => setShow(!show)}>Show</button>
        </p>
        {show && <CountryDetail country={country} />}
      </li>
    </div>
  );
};

const CountriesInfo = ({ list }) => {
  if (list.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (list.length === 1) {
    return <CountryDetail country={list[0]} />;
  }
  return (
    <ul>
      {list.map((country) => (
        <Country key={country.cca2} country={country} />
      ))}
    </ul>
  );
};

export default CountriesInfo;
