import React, { useState, useEffect } from "react";

import personService from "./services/persons";
import PersonInfo from "./components/PersonInfo";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notifications from "./components/Notifications";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialData) => {
      setPersons(initialData);
    });
  }, []);

  const personNames = persons.map((person) => person.name.toLowerCase());
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().match(filterName.toLowerCase())
  );
  const list = filterName.length === 0 ? persons : filteredPersons;

  const onSubmit = (newName, newNumber) => {
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setConfirmMessage(`Added ${newName}`);
        setTimeout(() => {
          setConfirmMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };
  const onRemove = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      })
      .catch((error) => {
        setErrorMessage(error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };
  const onChangeNumber = (newName, newNumber) => {
    const personToChange = persons.find((p) => p.name === newName);
    const changedPerson = { ...personToChange, number: newNumber };

    personService
      .update(personToChange.id, changedPerson)
      .then((data) => {
        setPersons(persons.map((p) => (p.id !== personToChange.id ? p : data)));
        setConfirmMessage(`Changed number of ${newName} to ${newNumber}`);
        setTimeout(() => {
          setConfirmMessage(null);
        }, 5000);
      })
      .catch(() => {
        setErrorMessage(
          `The person ${personToChange.name} was already deleted from the server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPersons(persons.filter((p) => p.id !== personToChange.id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter {...{ filterName, setFilterName }} />

      <h2>Add new</h2>
      <PersonForm
        {...{
          personNames,
          onSubmit,
          onChangeNumber,
        }}
      />
      <Notifications message={confirmMessage} notificationType="confirm" />
      <Notifications message={errorMessage} notificationType="error" />

      <h2>Contacts List</h2>
      <PersonInfo {...{ list, onRemove }} />
    </div>
  );
};

export default App;
