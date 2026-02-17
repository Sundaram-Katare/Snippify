import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setCredentials, logout, getProfile } from "./features/auth/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Snippets from "./pages/Snippets";
import SnippetDetail from "./pages/SnippetDetail";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next"

// Create a wrapper component to handle sidebar logic
function AppContent() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  // Sidebar should not show on home or auth
  const showSidebar = location.pathname !== "/" && location.pathname !== "/auth";

  // Navbar should not show on profile
  const showNavbar = location.pathname !== "/profile" && location.pathname !== "/snippets" && location.pathname !== "/dashboard";

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (token) {
      dispatch(getProfile());
    }
  }, [token, dispatch]);

  return (
    <div className="flex h-full">
      {showSidebar && <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />}
      <div className={`flex-1 flex flex-col ${showSidebar ? '' : 'w-full'}`}>
        {showNavbar && <Navbar toggleSidebar={toggleSidebar} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/snippets/:id" element={<SnippetDetail />} />
          <Route path="/auth" element={<AuthRoute><Signup /></AuthRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/snippets" element={<Snippets />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-right" />
        <AppContent />
        <Analytics />
      </Router>
    </>
  );
}

export default App;