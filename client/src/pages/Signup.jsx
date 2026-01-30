import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, loginUser } from "../features/auth/authSlice"; // import both thunks
import Dashboard from "./Dashboard.jsx";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isRegister, setIsRegister] = useState(true); // toggle between signup/login
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  // ✅ Persist login state across refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser && !user) {
      // optional: dispatch(setUser(JSON.parse(savedUser)))
    }
  }, [user]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(signupUser(formData));
    } else {
      dispatch(loginUser({ email: formData.email, password: formData.password }));
    }
  };

  // ✅ If user is signed up/logged in and token exists, show Dashboard
  if (token && user) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen grid grid-cols-2 gap-10 p-4 m-5 bg-gray-100/40">
      <div className="flex flex-col rounded-2xl p-6">
        <form onSubmit={onSubmit} className="max-w-md p-6 mt-10 space-y-4">
          {isRegister && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="p-2"
            >
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="Name"
                className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="p-2"
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="p-2"
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, z: -40 }}
            animate={{ opacity: 1, z: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {loading ? (isRegister ? "Signing up..." : "Logging in...") : isRegister ? "Sign Up" : "Login"}
          </motion.button>
        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <p className="text-black font-semibold font-inter mt-2">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>

      <div className="flex flex-col bg-[#375AE6] rounded-2xl p-6">
        <h1 className="text-3xl text-white text-center font-semibold h-20 font-inter">
          The Best Way to Manage <br /> Your Code Logic
        </h1>
        <motion.img
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          src="https://png.pngtree.com/png-vector/20251118/ourlarge/pngtree-ai-agent-managing-multiple-tasks-replacing-employees-png-image_18004669.webp"
          className="mt-10 rounded-2xl"
          alt=""
        />
      </div>
    </div>
  );
}