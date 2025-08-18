import React from "react";

export default function Badges({ items, className }) {
  return (
    <span>
      {items &&
        items.map((item, index) => (
          <span
            key={item + index}
            className={`badge text-dark mx-1 ${className}`}
          >
            {item}
          </span>
        ))}
    </span>
  );
}
