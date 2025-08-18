import React, { useState } from "react";

export function GlowingContainer({ children, darkMode }) {
  const [hovered, setHovered] = useState(false);

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "5fr 3fr",
    //alignItems: "center",
    justifyItems: "center",
    height: "600px",
    width: "70vw",
    minHeight: "30vw",
    marginTop: "120px",
    margin: "80px auto",
    alignItems: "end",
    backgroundColor: darkMode ? "black" : "white",
    color: darkMode ? "#888484ff" : "black",
    padding: "0px",
    //borderTopRightRadius: "30px",
    borderRadius: "30px",
    border: "2px solid #00f0ff",
    boxShadow: hovered ? "0 0 25px #00f0ff" : "0 0 10px #00f0ff",
    //transform: hovered ? "scale(1.2)" : "scale(1)",
    transition: "all 0.3s ease-in-out",
    overflow: "hidden",
    position: "relative",
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}
