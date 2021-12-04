import blogService from "../../services/blogs";

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: "NEW_BLOG",
      data: newBlog,
    });
  };
};

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog);
    dispatch({
      type: "UPDATE_BLOG",
      data: likedBlog,
    });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({
      type: "REMOVE_BLOG",
      data: { id },
    });
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const addedBlog = await blogService.comment(id, comment);

    dispatch({
      type: "UPDATE_BLOG",
      data: addedBlog,
    });
  };
};
