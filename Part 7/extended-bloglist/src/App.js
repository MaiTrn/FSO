import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import NewBlog from "./components/NewBlog";
import LoginForm from "./components/LoginForm";

import {
  notifyWith,
  initBlogs,
  createBlog,
  likeBlog,
  removeBlog,
  loginUser,
  logoutUser,
  loadUser,
  initUsers,
} from "./redux/actions";
import UserList from "./components/UserList";
import Menu from "./components/Menu";
import User from "./components/User";

const App = ({
  initBlogs,
  notifyWith,
  createBlog,
  likeBlog,
  removeBlog,
  loginUser,
  logoutUser,
  loadUser,
  initUsers,
  blogs,
  user,
  users,
}) => {
  const blogFormRef = React.createRef();
  const userMatch = useMatch("/users/:id");

  const userBydId = (id) => users.find((b) => b.id === id);
  const matchedUser = userMatch ? userBydId(userMatch.params.id) : null;

  useEffect(() => {
    if (user !== null) {
      initBlogs();
      initUsers();
    }
  }, [user, initBlogs, initUsers]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleLogin = async (userObject) => {
    try {
      await loginUser(userObject);
      notifyWith(
        {
          message: `${userObject.username} welcome back!`,
          type: "success",
        },
        5
      );
    } catch (exception) {
      console.log(exception);
      notifyWith(
        {
          message: "wrong username/password",
          type: "error",
        },
        5
      );
    }
  };

  const addBlog = async (blog) => {
    try {
      createBlog(blog);
      blogFormRef.current.toggleVisibility();
      notifyWith(
        {
          message: `a new blog '${blog.title}' by ${blog.author} added!`,
          type: "success",
        },
        5
      );
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLike = async (id) => {
    const blogToLike = blogs.find((b) => b.id === id);
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    };
    likeBlog(likedBlog);
    initBlogs();
  };

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find((b) => b.id === id);
    const ok = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
    );
    if (ok) {
      removeBlog(id);
      notifyWith(
        {
          message: `Blog ${blogToRemove.title} by ${blogToRemove.author} deleted`,
          type: "success",
        },
        5
      );
    }
  };

  const handleLogout = () => {
    logoutUser();
  };

  const Main = () => {
    const byLikes = (b1, b2) => b2.likes - b1.likes;
    if (!user) {
      return (
        <div>
          <h2>login to application</h2>

          <LoginForm login={handleLogin} />
        </div>
      );
    }
    return (
      <div>
        <h2>blogs</h2>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <NewBlog createBlog={addBlog} />
        </Togglable>

        {blogs.sort(byLikes).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            own={user.username === blog.userId.username}
          />
        ))}
      </div>
    );
  };
  return (
    <div>
      {user && (
        <div>
          <Menu />
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
        </div>
      )}
      <Notification />
      <Routes>
        <Route
          path="/users/:id"
          element={<User loggedIn={user ? true : false} user={matchedUser} />}
        />
        <Route
          path="/users"
          element={<UserList loggedIn={user ? true : false} users={users} />}
        />
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users,
  };
};

const mapDispatchToProps = {
  notifyWith,
  initBlogs,
  createBlog,
  likeBlog,
  removeBlog,
  loginUser,
  logoutUser,
  loadUser,
  initUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
