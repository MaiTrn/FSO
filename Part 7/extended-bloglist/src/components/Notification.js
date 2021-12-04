import React from "react";

import { connect } from "react-redux";

const Notification = (props) => {
  if (!props.notification) {
    return null;
  }

  return (
    <div className={`alert alert-${props.notification.type}`}>
      {props.notification.message}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

export default connect(mapStateToProps, null)(Notification);
