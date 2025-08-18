import React from "react";

export default function Alert(props) {
  return (
    <div className="alert" role="alert">
      <strong>{props.alert}</strong>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}
