import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import storage from "../utils/storage";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      storage.saveUser(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
    props.setPage("add");
    setUsername("");
    setPassword("");
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <table>
          <tbody>
            <tr>
              <th>username </th>
              <td>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>password </th>
              <td>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="submit">login</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default LoginForm;
