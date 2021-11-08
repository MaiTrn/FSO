import React from "react";

const Person = ({ person, onRemove }) => {
  const handleRemove = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      onRemove(person.id);
    }
  };

  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={handleRemove}>Delete</button>
      </td>
    </tr>
  );
};

const PersonInfo = ({ list, onRemove }) => (
  <table>
    <tbody>
      {list.map((person) => (
        <Person key={person.id} {...{ person, onRemove }} />
      ))}
    </tbody>
  </table>
);

export default PersonInfo;
