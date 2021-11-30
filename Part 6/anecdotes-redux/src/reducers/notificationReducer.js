const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.notification;
    case "REMOVE_MESSAGE":
      return null;
    default:
      return state;
  }
};

const setNotification = (notification) => {
  return {
    type: "SET_MESSAGE",
    notification,
  };
};
const removeNotification = () => {
  return {
    type: "REMOVE_MESSAGE",
  };
};
let timeoutID = undefined;
export const showNotification = (notification, time) => {
  if (timeoutID !== undefined) clearTimeout(timeoutID);
  return async (dispatch) => {
    dispatch(setNotification(notification));
    timeoutID = setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export default notificationReducer;
