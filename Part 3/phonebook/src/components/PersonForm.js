import React, { useState } from "react";

const PersonForm = ({ personNames, onSubmit, onChangeNumber }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = newName.trim();
    if (personNames.indexOf(name.toLowerCase()) !== -1) {
      if (
        window.confirm(
          `${name} is already added to the phonebook, replace the old number with the new one?`
        )
      )
        onChangeNumber(name, newNumber);
    } else {
      onSubmit(name, newNumber);
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>
              <input
                pattern="[a-zA-Z\s]+"
                value={newName}
                onChange={handleNameChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Number:</td>
            <td>
              <input
                type="tel"
                value={newNumber}
                onChange={handleNumberChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button type="submit">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
export default PersonForm;
