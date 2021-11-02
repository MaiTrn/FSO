import React from "react";

const Filter = ({ filterParam, setFilterParam }) => {
  const handleChange = (event) => {
    setFilterParam(event.target.value);
  };

  return (
    <div>
      Find countries <input value={filterParam} onChange={handleChange} />
    </div>
  );
};

export default Filter;
