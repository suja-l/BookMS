import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlowingContainer } from "./styleup";
import { Button } from "../../Components/Button";

function SignIn() {
  document.title = "Signin-BookMyShow";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁️ New state
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#ffffff";
  }, [darkMode]);

  const HandleLogin = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const user = storedUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!storedUsers.some((u) => u.email === email)) {
      setMessage("Invalid Email");
    } else if (user) {
      localStorage.setItem("isLogin", "true");
      navigate("/dashboard");
      window.location.reload();
    } else {
      setMessage(" WRONG PASSWORD!");
    }
  };

  const inputStyle = {
    backgroundColor: "white",
    color: "black",
  };

  return (
    <GlowingContainer darkMode={darkMode}>
      <div className="cutomForm">
        <Button color="btn-light">Continue with Google</Button>
        <Button color="btn-primary">Continue with Facebook</Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <form onSubmit={HandleLogin}>
          <h2 className="text-center mb-4">Sign In</h2>

          <div className="mb-3">
            <label htmlFor="signinEmail" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="signinEmail"
              value={email}
              style={inputStyle}
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="signinPassword" className="form-label">
              Password:
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="signinPassword"
                value={password}
                style={inputStyle}
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
          <div style={{ height: "1px", width: "200px", color: "red" }}>
            {message}
          </div>

          <button
            type="submit"
            className="btn btn-success px-4 py-2 rounded-pill shadow-sm "
            style={{ marginLeft: "20px", marginTop: "1rem", width: "325px" }}
          >
            Log In
          </button>

          {message && (
            <div
              className="mt-3 text-center"
              style={{ color: message.startsWith("✅") ? "green" : "red" }}
            >
              {message}
            </div>
          )}

          <div
            className="form-check form-switch d-flex align-items-center justify-content-end gap-2"
            style={{
              marginTop: "1.770rem",
              justifyContent: "flex-end",
              marginRight: "35px",
              marginLeft: "30px",
            }}
          >
            <div>
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
            <Link to="../signup">
              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: "100px" }}
              >
                Sign up
              </button>
            </Link>
          </div>
        </form>
      </div>
    </GlowingContainer>
  );
}

export default SignIn;
