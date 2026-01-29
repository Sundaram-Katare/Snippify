import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import Dashboard from "./Dashboard.jsx";
import { motion } from "framer-motion";

export default function Signup() {
  const { user, login, logout, register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      await register(form.name, form.email, form.password);
      alert("Registered! Please login");
      setIsRegister(false);
    } else {
      await login(form.email, form.password);
    }
  };

  if (user)
    return (
      <Dashboard />
    );

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-aqua-200 grid grid-cols-2 gap-10 p-4 m-5 bg-gray-100/40">
        <div className="flex flex-col rounded-2xl p-6 ">
          {/* <h1 className="text-black font-inter text-3xl font-semibold">
          Get started now
        </h1> */}
          <form
            onSubmit={onSubmit}
            className="max-w-md p-6 mt-10 space-y-4 "
          >
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0 }}
              className="p-2"
            >
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Name"
                className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>

            <motion.div className="p-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="Email"
                className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>

            <motion.div className="p-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
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
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              {isRegister ? "Sign Up" : "Login"}
            </motion.button>
          </form>
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
            The Best Way to Manage
            <br />
            Your Code Logic
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
    </>
  );
}
