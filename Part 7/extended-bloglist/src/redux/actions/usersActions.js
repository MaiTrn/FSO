import usersService from "../../services/users";

export const initUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch({
      type: "INIT_USERS",
      data: users,
    });
  };
};
