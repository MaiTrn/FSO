import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const User = ({ loggedIn, user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.length === 0 ? (
          <div>No blogs...</div>
        ) : (
          user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
        )}
      </ul>
    </div>
  );
};

export default User;
