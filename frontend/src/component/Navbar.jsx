import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle2 } from "lucide-react";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("username");

    if (user) {
      setUsername(user);
    }
  }, []);

  // LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");

    navigate("/"); // landing page
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-white">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        {/* Username */}
 <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
          <UserCircle2 size={28} className="text-white" />

          <span className="text-white font-medium">
            {username ? username : "User"}
          </span>
        </div>


        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-white text-purple-600 px-4 py-1 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;