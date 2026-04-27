// components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-indigo-600 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">SheCraft AI</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:bg-indigo-500 p-2 rounded">Home</Link>
        <Link to="/dashboard" className="hover:bg-indigo-500 p-2 rounded">Dashboard</Link>
        <Link to="/PortfolioBuilder" className="hover:bg-indigo-500 p-2 rounded">PortfolioBuilder</Link>
        <Link to="/ai" className="hover:bg-indigo-500 p-2 rounded">AI Writer</Link>
        <Link to="/projects" className="hover:bg-indigo-500 p-2 rounded">Projects</Link>
        <Link to="/resumeBuilder" className="hover:bg-indigo-500 p-2 rounded">Generate Resume</Link>

      </nav>
    </div>
  );
};

export default Sidebar;