import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import Dashboard from "./Dashboard.jsx";

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
    <div className="min-h-screen grid grid-cols-2 gap-10 p-4 m-5">
      <div className="flex flex-col rounded-2xl p-6">
        <h1 className="text-black font-inter text-3xl font-semibold">
          Get started now
        </h1>
        <form
          onSubmit={onSubmit}
          className="max-w-md p-6 mt-10 space-y-4"
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

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {isRegister ? "Sign Up" : "Login"}
          </button>
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
        <h1 className="text-3xl text-white font-inter">
          The Best Way to Manage
          <br />
          Your Code
        </h1>
        <img
          src="https://themewagon.com/wp-content/uploads/2021/11/polluxui-1.png"
          className="mt-10 rounded-2xl"
          alt=""
        />
      </div>
    </div>
    </>
  );
}
