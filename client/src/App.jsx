import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setCredentials, logout } from "./features/auth/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);

      // token expired?
      if (decoded.exp * 1000 < Date.now()) {
        dispatch(logout());
      } else {
        dispatch(
          setCredentials({
            user: decoded, // or decoded.userId / email
            token,
          })
        );
      }
    } catch (err) {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthRoute><Signup /></AuthRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;