import { FaEdit, FaTrash } from "react-icons/fa";
import React from "react";
import "../index.css";
export function HandleDelete({ data, item, setData, storageKey }) {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${
      item.name || item.title || "this item"
    }"?`
  );
  if (!confirmed) return;

  const updated = data.filter((t) => t.id !== item.id);
  setData(updated);

  if (storageKey) {
    localStorage.setItem(storageKey, JSON.stringify(updated));
  }
}

// General-purpose button
export const Button = ({ children, color, className, ...rest }) => {
  return (
    <button
      type="button"
      {...rest}
      className={` button-3d-effect ${color}  ${
        className || ""
      } btn rounded-2 `}
    >
      {children || "Button"}
    </button>
  );
};

// Modal close button
export const CloseModal = ({ ...rest }) => {
  return (
    <Button {...rest} color={"btn-secondary"}>
      Close
    </Button>
  );
};

// Modal save button
export const SaveModal = ({ className, ...rest }) => {
  return (
    <Button type="submit" color={"btn-primary"} {...rest}>
      Save
    </Button>
  );
};

// Edit button
export const EditButton = ({ ...rest }) => {
  return (
    <Button color {...rest}>
      <FaEdit className="me-1" />
    </Button>
  );
};

// Delete button
export const DeleteButton = ({ data, item, setData, storageKey, ...rest }) => {
  return (
    <Button
      {...rest}
      color=""
      onClick={() => HandleDelete({ data, item, setData, storageKey })}
    >
      <FaTrash className="me-1" />
    </Button>
  );
};

// Input field with label
export const InputField = ({
  as: Component = "input",
  inputType,
  inputPlaceholder,
  inputClass = "",
  divClass = "",
  value,
  label,
  name,
  onChange,
  ...rest
}) => {
  return (
    <div className={`${divClass}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <Component
        type={inputType}
        className={`form-control mb-2 w-100 ${inputClass}`}
        placeholder={inputPlaceholder || label}
        value={value}
        name={name}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

// Sticky table header cell
export const StickyTh = ({ children, className }) => {
  return (
    <th
      scope="col"
      className={`px-3 py-2 ${className || ""}`}
      style={{
        // position: "sticky",
        top: "66px",
        backgroundColor: "#343a40",
        color: "white",
        zIndex: 2,
      }}
    >
      {children}
    </th>
  );
};
