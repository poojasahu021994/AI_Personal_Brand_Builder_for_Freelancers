import React, { useState } from "react";
import axios from "axios";

export default function Register() {

const [form,setForm]=useState({
username:"",
email:"",
password:""
})

const registerUser = async()=>{
await axios.post("https://poojacodes.pythonanywhere.com/api/register/",form)
alert("Registered Successfully")
}

return(
<div className="min-h-screen bg-[#0b0f19] flex justify-center items-center">

<div className="bg-white/5 p-8 rounded-2xl w-[400px]">

<h2 className="text-white text-3xl mb-6">Register</h2>

<input placeholder="Username"
className="w-full p-3 mb-3 bg-black/30 text-white rounded"
onChange={(e)=>setForm({...form,username:e.target.value})}
/>

<input placeholder="Email"
className="w-full p-3 mb-3 bg-black/30 text-white rounded"
onChange={(e)=>setForm({...form,email:e.target.value})}
/>

<input placeholder="Password"
type="password"
className="w-full p-3 mb-3 bg-black/30 text-white rounded"
onChange={(e)=>setForm({...form,password:e.target.value})}
/>

<button
onClick={registerUser}
className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-white">
Register
</button>

</div>
</div>
)
}