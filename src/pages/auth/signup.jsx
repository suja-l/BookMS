import React, { useState, useEffect } from "react";
import { Input } from "../../Components/Input";
import { Link, useNavigate } from "react-router-dom";
import { GlowingContainer } from "./styleup";
import { Button } from "./../../Components/Button";
import "../../pages/form.css";

export default function Signup() {
  document.title = "Signup-BookMyShow";
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 NEW
  useEffect(() => {
    const StoredUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const emailexists = StoredUsers.some((u) => u.email === email);
    if (emailexists && email) {
      setMessage("Email id already in use");
    } else {
      setMessage("");
    }
  }, [email]);
  let navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#ffffff";
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { name, mobile, email, password };

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    alert("User registered successfully!");

    setName("");
    setMobile("");
    setEmail("");
    setPassword("");
    localStorage.setItem("isLogin", "true");

    navigate("/dashboard");
    window.location.reload();
  };

  return (
    <GlowingContainer darkMode={darkMode}>
      <div className="cutomForm">
        <Button name="Continue with Google" color="btn-light" />
        <Button name="Continue with Facebook" color="btn-primary" />
      </div>

      <form onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Sign Up</h2>

        <div className="mb-3">
          <Input
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            label="Name"
            type="text"
            required
          />
        </div>

        <div className="mb-3">
          <Input
            name="mobile"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
            label="Mobile Number:"
            type="tel"
            maxLength={10}
            pattern="\d{10}"
            placeholder="0123456789"
            required
          />
        </div>

        <div className="mb-3">
          <Input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            label="Email:"
            type="email"
            placeholder="example@gmail.com"
            required
          />
        </div>

        {/* 👇 Password field replaced to add toggle */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              value={password}
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="form-text">Must be 8–20 characters long.</div>
        <div style={{ height: "20px", width: "200px", color: "red" }}>
          {message}
        </div>

        <button
          type="submit"
          className="btn btn-primary px-4 py-2 mt-2 rounded-pill shadow-sm "
          style={{ marginLeft: "20px", width: "325px" }}
          disabled={
            !name || !mobile.match(/^\d{10}$/) || !email || password.length < 8
          }
        >
          Submit
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "30px",
            marginBottom: "2px",
          }}
        >
          <div
            className="form-check form-switch"
            style={{ marginBottom: "0px" }}
          >
            <input
              className="form-check-input"
              type="checkbox"
              onChange={() => setDarkMode(!darkMode)}
              checked={darkMode}
              id="darkModeSwitch"
            />
            <label className="form-check-label ms-2" htmlFor="darkModeSwitch">
              {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
            </label>
          </div>

          <Link to="../signin">
            <button
              type="button"
              className="btn btn-secondary "
              style={{ width: "100px" }}
            >
              Sign in
            </button>
          </Link>
        </div>
      </form>
    </GlowingContainer>
  );
}
