import React, { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name.common}`
      )
      .then((response) => setWeather(response.data.current));
  }, [country.name.common]);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <h3>Weather</h3>
      <p>
        <strong>Temperature:</strong> {weather?.temperature} Celcius
      </p>
      {weather?.weather_icons.map((icon, index) => (
        <img key={index} src={icon} alt="Weather icon" />
      ))}
      <p>
        <strong>Wind:</strong> {weather?.wind_speed} mph direction{" "}
        {weather?.wind_dir}
      </p>
    </div>
  );
};

export default CountryDetail;
