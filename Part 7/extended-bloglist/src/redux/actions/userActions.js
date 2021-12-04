import { notifyWith } from ".";
import loginService from "../../services/login";
import storage from "../../utils/storage";

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const newUser = await loginService.login(user);
      storage.saveUser(newUser);
      dispatch({
        type: "LOGIN_USER",
        data: newUser,
      });
      dispatch(
        notifyWith(
          {
            message: `${newUser.name} welcome back!`,
            type: "success",
          },
          5
        )
      );
    } catch (exception) {
      dispatch(
        notifyWith(
          {
            message: "wrong username/password",
            type: "danger",
          },
          5
        )
      );
    }
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
