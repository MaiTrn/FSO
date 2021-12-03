const setNotification = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    notification,
  };
};

const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
  };
};

let timeoutID = undefined;

export const notifyWith = (notification, time) => {
  clearTimeout(timeoutID);
  return async (dispatch) => {
    dispatch(setNotification(notification));
    timeoutID = setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};
