import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, loginUser } from "../features/auth/authSlice";
import Dashboard from "./Dashboard.jsx";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isRegister, setIsRegister] = useState(true);
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser && !user) {
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

  if (token && user) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FFFDF1]">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 bg-white/40 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-8">
        
        <div className="flex flex-col justify-center rounded-2xl p-4 sm:p-6">
          <form onSubmit={onSubmit} className="w-full max-w-md mx-auto space-y-4">
            {isRegister && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="p-2"
              >
                <label className="text-[#6B3A00] font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  placeholder="Name"
                  className="w-full px-4 py-2 rounded-2xl border border-[#E8B988] bg-white focus:outline-none focus:ring-2 focus:ring-[#F28C38]"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="p-2"
            >
              <label className="text-[#6B3A00] font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="Email"
                className="w-full px-4 py-2 rounded-2xl border border-[#E8B988] bg-white focus:outline-none focus:ring-2 focus:ring-[#F28C38]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="p-2"
            >
              <label className="text-[#6B3A00] font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={onChange}
                placeholder="Password"
                className="w-full px-4 py-2 rounded-2xl border border-[#E8B988] bg-white focus:outline-none focus:ring-2 focus:ring-[#F28C38]"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, z: -40 }}
              animate={{ opacity: 1, z: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              type="submit"
              disabled={loading}
              className="w-full bg-[#F28C38] text-white py-2 rounded-xl hover:bg-[#e07d2f] transition font-semibold"
            >
              {loading ? (isRegister ? "Signing up..." : "Logging in...") : isRegister ? "Sign Up" : "Login"}
            </motion.button>
          </form>

          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

          <p className="text-[#6B3A00] font-semibold mt-4 text-center">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              className="text-[#F28C38] cursor-pointer"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>

        <div className="hidden lg:flex flex-col justify-center items-center rounded-2xl p-6 bg-gradient-to-b from-[#E8B988] via-[#F28C38] to-[#6B3A00]">
          <h1 className="text-2xl xl:text-3xl text-white text-center font-semibold leading-snug">
            The Best Way to Manage <br /> Your Code Logic
          </h1>
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            src="https://png.pngtree.com/png-vector/20251118/ourlarge/pngtree-ai-agent-managing-multiple-tasks-replacing-employees-png-image_18004669.webp"
            className="mt-8 rounded-2xl w-full max-w-sm xl:max-w-md object-contain"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
