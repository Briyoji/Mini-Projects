import React from "react";
// import PropTypes from 'prop-types'

export default function Alert(props) {
  return (
    <div className="alert-container">
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{props.alert.type.toUpperCase()}: </strong>{props.alert.message}
      </div>}
    </div>
  );
}
