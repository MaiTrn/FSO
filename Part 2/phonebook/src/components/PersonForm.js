import React, { useState } from "react";

const PersonForm = ({ personNames, onSubmit, onChangeNumber }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (personNames.indexOf(newName.toLowerCase()) !== -1) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with the new one?`
        )
      )
        onChangeNumber(newName, newNumber);
    } else {
      onSubmit(newName, newNumber);
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
              <input value={newName} onChange={handleNameChange} required />
            </td>
          </tr>
          <tr>
            <td>Number:</td>
            <td>
              <input
                type="tel"
                value={newNumber}
                onChange={handleNumberChange}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="000-000-0000"
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
