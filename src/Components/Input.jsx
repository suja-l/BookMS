import React from "react";

export function Input({
  label,
  name,
  onChange,
  type = "text",
  value,
  ...rest
}) {
  return (
    <>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        className="form-control"
        id={name}
        style={{
          backgroundColor: "white",
          color: "black",
          width: "100%",
          minWidth: "200px",
          minHeight: "40px",
        }}
        placeholder="Enter your name"
        value={value}
        onChange={onChange}
        {...rest}
      />
    </>
  );
}
