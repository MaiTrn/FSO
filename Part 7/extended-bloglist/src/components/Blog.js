import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  notifyWith,
  initBlogs,
  likeBlog,
  removeBlog,
  commentBlog,
} from "../redux/actions";

const Blog = ({ blog, loggedIn, own }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  if (!blog) {
    return null;
  }

  const handleLike = async () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(likeBlog(likedBlog));
    dispatch(initBlogs());
  };
  const handleRemove = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
    if (ok) {
      dispatch(removeBlog(blog.id));
      dispatch(
        notifyWith(
          {
            message: `Blog ${blog.title} by ${blog.author} deleted`,
            type: "success",
          },
          5
        )
      );
      dispatch(initBlogs());
      navigate("/");
    }
  };
  const handleComment = async (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    dispatch(commentBlog(blog.id, { comment }));
    dispatch(
      notifyWith(
        {
          message: "comment added",
          type: "success",
        },
        5
      )
    );
  };

  return (
    <div>
      <h2>Blogs</h2>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes{" "}
        <Button variant="primary" onClick={handleLike}>
          <i class="bi bi-hand-thumbs-up"></i>
        </Button>
      </p>
      <p>added by {blog.user.name}</p>
      {own && (
        <Button variant="danger" onClick={handleRemove}>
          remove
        </Button>
      )}
      <h3>comments</h3>
      <Form onSubmit={handleComment}>
        <Form.Group>
          <Form.Control id="comment" name="comment" />
          <Button type="submit" variant="light">
            add comment
          </Button>
        </Form.Group>
      </Form>
      <ul>
        {blog.comments.length === 0 ? (
          <p>No comments...</p>
        ) : (
          blog.comments.map((comment, index) => <li key={index}>{comment}</li>)
        )}
      </ul>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  own: PropTypes.bool.isRequired,
};

export default Blog;
