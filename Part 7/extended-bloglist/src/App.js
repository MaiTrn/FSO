import React, { useEffect, useRef } from "react";
import { Routes, Route, useMatch } from "react-router-dom";
//routes is switch
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import NewBlog from "./components/NewBlog";
import LoginForm from "./components/LoginForm";

import { initBlogs, loadUser, initUsers } from "./redux/actions";
import UserList from "./components/UserList";
import Menu from "./components/Menu";
import User from "./components/User";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const blogFormRef = useRef();
  const user = useSelector(({ user }) => user);

  useEffect(() => {
    if (user !== null) {
      dispatch(initBlogs());
      dispatch(initUsers());
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const blogs = useSelector(({ blogs }) => blogs);
  const users = useSelector(({ users }) => users);
  const userMatch = useMatch("/users/:id");
  const blogMatch = useMatch("/blogs/:id");

  const userBydId = (id) => users.find((u) => u.id === id);
  const matchedUser = userMatch ? userBydId(userMatch.params.id) : null;

  const blogById = (id) => blogs.find((b) => b.id === id);
  const matchedBlog = blogMatch ? blogById(blogMatch.params.id) : null;

  const Main = () => {
    if (!user) {
      return (
        <div className="container">
          <h2>login to application</h2>
          <LoginForm />
        </div>
      );
    }
    return (
      <div className="container">
        <h2>blogs app</h2>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <NewBlog blogRef={blogFormRef} />
        </Togglable>
        <BlogList blogs={blogs} />
      </div>
    );
  };

  return (
    <div className="container">
      {user && (
        <div>
          <Menu />
        </div>
      )}
      <Notification />
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <Blog
              loggedIn={user ? true : false}
              blog={matchedBlog}
              own={
                user && matchedBlog
                  ? user.username === matchedBlog.user.username
                  : false
              }
            />
          }
        />
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

export default App;
