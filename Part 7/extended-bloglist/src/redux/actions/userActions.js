import loginService from "../../services/login";
import storage from "../../utils/storage";

export const loginUser = (user) => {
  return async (dispatch) => {
    const newUser = await loginService.login(user);
    storage.saveUser(newUser);
    dispatch({
      type: "LOGIN_USER",
      data: newUser,
    });
  };
};

export const loadUser = () => {
  return (dispatch) => {
    const loadedUser = storage.loadUser();
    dispatch({
      type: "LOGIN_USER",
      data: loadedUser,
    });
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    storage.logoutUser();
    dispatch({
      type: "LOGOUT_USER",
    });
  };
};
