import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Login() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const loginUser = async () => {
    const res = await axios.post("http://127.0.0.1:8000/api/login/", form);

    localStorage.setItem("token", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    localStorage.setItem("username", form.username);
    nav("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex justify-center items-center">
      <div className="bg-white/5 p-8 rounded-2xl w-[400px] border border-white/10">

        <h2 className="text-white text-3xl mb-6 font-bold">Login</h2>

        <input
          placeholder="Username"
          className="w-full p-3 mb-4 rounded bg-black/30 text-white"
          onChange={(e)=>setForm({...form,username:e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-black/30 text-white"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <button
          onClick={loginUser}
          className="w-full p-3 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        >
          Login
        </button>

        <div className="text-center mt-5 text-sm text-gray-400">
  Don't have an account?{" "}
  <Link
    to="/register"
    className="text-pink-400 font-semibold hover:text-pink-300"
  >
    Register Now
  </Link>
</div>

      </div>
    </div>
  );
}