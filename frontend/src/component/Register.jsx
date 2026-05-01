import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

export default function Register() {

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const registerUser = async () => {
        await axios.post("https://poojacodes.pythonanywhere.com/api/register/", form)
        alert("Registered Successfully")
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-[#0b0f19] flex justify-center items-center">

            <div className="bg-white/5 p-8 rounded-2xl w-[400px]">

                <h2 className="text-white text-3xl mb-6">Register</h2>

                <input placeholder="Username"
                    className="w-full p-3 mb-3 bg-black/30 text-white rounded"
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />

                <input placeholder="Email"
                    className="w-full p-3 mb-3 bg-black/30 text-white rounded"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input placeholder="Password"
                    type="password"
                    className="w-full p-3 mb-3 bg-black/30 text-white rounded"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                <button
                    onClick={registerUser}
                    className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-white">
                    Register
                </button>

                <div className="text-center mt-5 text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/login" className="text-pink-400 font-semibold hover:text-pink-300">
                        Login
                    </Link>
                </div>

            </div>
        </div>
    )
}