const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return state.concat(action.data);
    case "INIT_BLOGS":
      return action.data;
    case "UPDATE_BLOG": {
      const id = action.data.id;
      return state.map((blog) => (blog.id === id ? action.data : blog));
    }
    case "REMOVE_BLOG": {
      const id = action.data;
      return state.filter((blog) => blog.id !== id);
    }
    default:
      return state;
  }
};

export default blogReducer;
