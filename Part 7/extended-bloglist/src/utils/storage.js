const storageKey = "loggedBlogAppUser";

const saveUser = (user) =>
  window.localStorage.setItem(storageKey, JSON.stringify(user));

const loadUser = () => JSON.parse(window.localStorage.getItem(storageKey));

const logoutUser = () => window.localStorage.removeItem(storageKey);

export default {
  saveUser,
  loadUser,
  logoutUser,
};
