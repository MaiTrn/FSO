const usersReducer = (state = [], action) => {
  if (action.type === "INIT_USERS") return action.data;
  else return state;
};

export default usersReducer;
