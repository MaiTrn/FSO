const storageKey = "library-user-token";

const saveUser = (token) => window.localStorage.setItem(storageKey, token);

const loadUser = () => window.localStorage.getItem(storageKey);

const logoutUser = () => window.localStorage.removeItem(storageKey);

const storage = {
  saveUser,
  loadUser,
  logoutUser,
};

export default storage;
