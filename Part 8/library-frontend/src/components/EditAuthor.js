import React, { useState } from "react";
import Select from "react-select";
import { useMutation } from "@apollo/client";
import { SET_BORN } from "../queries";

const EditAuthor = (props) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState("");

  const [setBornYear] = useMutation(SET_BORN, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message);
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    setBornYear({ variables: { name: name.value, setBornTo: Number(born) } });

    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>
                <Select
                  defaultValue={name}
                  onChange={setName}
                  options={props.authors}
                />
              </td>
            </tr>
            <tr>
              <th>Born</th>
              <td>
                <input
                  type="number"
                  value={born}
                  onChange={({ target }) => setBorn(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="submit">Update author</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default EditAuthor;
