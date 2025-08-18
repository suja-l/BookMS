// import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/auth/signup.jsx";
import SignIn from "./pages/auth/signin.jsx";
import Navbar from "./Components/Navbar.jsx";
import Showtime from "./pages/Showtime/showtime.jsx";
import Database from "./pages/dashboard/database.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Theatres from "./pages/theater/Theatres.jsx";
import Movies from "./pages/Movies/movies.jsx";
import SampleM from "./pages/Movies/sampleM.jsx";
import "../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
function App() {
  const isLogin = localStorage.getItem("isLogin") || "false";
  console.log("isLogin", isLogin);

  if (isLogin !== "true") {
    return (
      <Routes>
        <Route path="/" element={<Navigate to={"/signin"} />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    );
  }
  return (
    <>
      <Navbar title="MyApp" />

      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sampleM" element={<SampleM />} />

        <Route path="/showtime" element={<Showtime />} />
        <Route path="/database" element={<Database />} />
        <Route path="/theatres" element={<Theatres />} />
        <Route path="/movies" element={<Movies />} />

        <Route path="/*" element={<h4>Page Not Found</h4>} />
      </Routes>
    </>
  );
}

export default App;
