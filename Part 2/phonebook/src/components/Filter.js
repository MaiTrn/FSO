import React from "react";

const Filter = ({ filterName, setFilterName }) => {
  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      Filter shown with{" "}
      <input value={filterName} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
