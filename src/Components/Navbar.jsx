import React from "react";
// import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();
  function HandleLogout(navigate) {
    navigate("../signin");
    localStorage.setItem("isLogin", "false");
    window.location.reload();
  }
  const navbarStyle = {
    background: "rgba(10, 20, 30, 0.7)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: "0",
    zIndex: "1000",
  };
  const getNavLinkStyle = ({ isActive }) => ({
    color: isActive ? "#ffffff" : "#bdb7b7c1",
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none", // Optional: removes underline from links
  });
  return (
    <>
      <nav className="navbar navbar-expand-lg mb-0" style={navbarStyle}>
        <div className="container-fluid" style={{ color: "#bdb7b7c1" }}>
          <NavLink className="navbar-brand" to="/" style={getNavLinkStyle}>
            {props.title}
          </NavLink>
          <button
            style={{ getNavLinkStyle }}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-3 mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/Theatres"
                  style={getNavLinkStyle}
                >
                  Theatres
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/movies"
                  style={getNavLinkStyle}
                >
                  Movies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/showtime"
                  style={getNavLinkStyle}
                >
                  Showtime
                </NavLink>
              </li>
            </ul>

            <div className="nav-item ms-auto d-flex align-items-center gap-3">
              <NavLink
                className="nav-link"
                to="/database"
                style={getNavLinkStyle}
              >
                User-Table
              </NavLink>
              <button
                className="btn btn-secondary  rounded-pill ms-auto"
                type="button"
                onClick={() => HandleLogout(navigate)}
                style={{
                  right: "30px",
                  padding: "12px 24px",
                  width: "100px",
                }}
              >
                logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
