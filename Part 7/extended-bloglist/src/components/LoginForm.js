import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { loginUser } from "../redux/actions";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(loginUser({ username, password }));

    setUsername("");
    setPassword("");
  };
  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username </Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password </Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" id="login" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
