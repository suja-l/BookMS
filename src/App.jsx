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
  // localStorage gives strings, so check explicitly
  const isLogin = localStorage.getItem("isLogin") === "true";

  function ProtectedRoute({ children }) {
    return isLogin ? children : <Navigate to="/signin" replace />;
  }

  return (
    <>
      {/* Navbar only shows when logged in */}
      {isLogin && <Navbar title="MyApp" />}

      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={<Navigate to={isLogin ? "/dashboard" : "/signin"} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sampleM"
          element={
            <ProtectedRoute>
              <SampleM />
            </ProtectedRoute>
          }
        />
        <Route
          path="/showtime"
          element={
            <ProtectedRoute>
              <Showtime />
            </ProtectedRoute>
          }
        />
        <Route
          path="/showtime/:movieId"
          element={
            <ProtectedRoute>
              <Showtime />
            </ProtectedRoute>
          }
        />
        <Route
          path="/database"
          element={
            <ProtectedRoute>
              <Database />
            </ProtectedRoute>
          }
        />
        <Route
          path="/theatres"
          element={
            <ProtectedRoute>
              <Theatres />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="/*" element={<h4>Page Not Found</h4>} />
      </Routes>
    </>
  );
}

export default App;
