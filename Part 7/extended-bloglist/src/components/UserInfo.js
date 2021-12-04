import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions";

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  if (user)
    return (
      <em>
        {user.name} logged in
        <button
          type="button"
          className="btn btn-outline-primary me-2"
          style={{ marginLeft: "10px" }}
          onClick={handleLogout}
        >
          logout
        </button>
      </em>
    );
  else return null;
};

export default UserInfo;
