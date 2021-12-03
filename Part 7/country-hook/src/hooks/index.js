import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name !== "") {
      axios
        .get(`https://restcountries.com/v2/name/${name}`)
        .then((response) => {
          if (response.data.message?.match("Not Found")) {
            setCountry({
              found: false,
            });
          } else {
            setCountry({
              found: true,
              data: response.data[0],
            });
          }
        });
    } else setCountry(null);
  }, [name]);
  return country;
};
