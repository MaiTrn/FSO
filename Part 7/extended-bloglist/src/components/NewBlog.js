import React from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { notifyWith, createBlog } from "../redux/actions";

const NewBlog = ({ blogRef }) => {
  const dispatch = useDispatch();

  const handleNewBlog = (event) => {
    event.preventDefault();

    try {
      const author = event.target.author.value;
      const title = event.target.title.value;
      const url = event.target.url.value;
      dispatch(createBlog({ author, title, url }));
      blogRef.current.toggleVisibility();
      notifyWith(
        {
          message: `a new blog '${title}' by ${author} added!`,
          type: "success",
        },
        5
      );
    } catch (exception) {
      console.log(exception);
      notifyWith(
        {
          message: "An error occurred while trying to create new blog",
          type: "danger",
        },
        5
      );
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group>
          <Form.Label>author </Form.Label>
          <Form.Control type="text" id="author" name="author" />
          <Form.Label>title</Form.Label>
          <Form.Control type="text" id="title" name="title" />
          <Form.Label>url </Form.Label>
          <Form.Control type="text" id="url" name="url" />
          <Button variant="primary" id="create" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewBlog;
