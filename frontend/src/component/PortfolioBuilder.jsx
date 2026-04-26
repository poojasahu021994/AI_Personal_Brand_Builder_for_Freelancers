// pages/PortfolioBuilder.js
import React, { useState } from "react";
import Layout from "./Layout";
import axios from "axios";

const PortfolioBuilder = () => {
  const [form, setForm] = useState({
    name: "",
    role: "",
    about: "",
    skills: "",
    projects: "",
    email: "",
    linkedin: "",
  });

  const [portfolio, setPortfolio] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/generate-portfolio/",
        form
      );

      let data = res.data.portfolio;
      console.log("portfolio data", data)

      // 🧠 safety fixes
      if (typeof data?.skills === "string") {
        data.skills = data.skills.split(",");
      }

      // if (!Array.isArray(data.projects)) {
      //   data.projects = [];
      // }

      setPortfolio(data);

      console.log("FINAL DATA:", data);

    } catch (err) {
      console.error(err);
      alert("Error generating portfolio");
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">PortfolioBuilder</h2>

      <div className="flex gap-8 p-6 bg-gray-100 min-h-screen">

        {/* FORM */}
        <div className="w-1/2 bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-bold mb-4">Portfolio Form</h2>

          <input name="name" placeholder="Name" onChange={handleChange} className="input-style" />
          <input name="role" placeholder="Role" onChange={handleChange} className="input-style" />
          <textarea name="about" placeholder="About" onChange={handleChange} className="input-style" />
          <textarea name="skills" placeholder="Skills (comma separated)" onChange={handleChange} className="input-style" />
          <textarea name="projects" placeholder="Projects" onChange={handleChange} className="input-style" />
          <input name="email" placeholder="Email" onChange={handleChange} className="input-style" />
          <input name="linkedin" placeholder="LinkedIn" onChange={handleChange} className="input-style" />

          <button
            onClick={handleGenerate}
            className="mt-4 bg-indigo-600 text-white p-3 w-full rounded-xl"
          >
            Generate Portfolio
          </button>
        </div>

        {/* PREVIEW */}
        {portfolio ? (
          <div className="w-1/2 rounded-2xl overflow-hidden shadow-2xl bg-gray-950 text-white">

            {/* HERO */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
              <h1 className="text-3xl font-bold">{portfolio.name}</h1>
              <p className="mt-2">{portfolio.role}</p>

              <div className="mt-3 text-sm">
                <p>{portfolio.email}</p>
                <p>{portfolio.linkedin}</p>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-6">

              {/* ABOUT */}
              <div className="bg-gray-900 p-5 rounded-xl">
                <h2 className="text-indigo-400 mb-2">About</h2>
                <p>{portfolio.about}</p>
              </div>

              {/* SKILLS */}
              <div className="flex flex-wrap gap-2">
                {Array.isArray(portfolio?.skills) ? (
                  portfolio.skills.map((s, i) => (
                    <span key={i} className="bg-indigo-600 px-2 py-1 rounded text-xs">
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">No skills</span>
                )}
              </div>

              {/* PROJECTS */}
              <div className="bg-gray-900 p-5 rounded-xl">
                <h2 className="text-indigo-400 mb-2">Projects</h2>
                {Array.isArray(portfolio?.projects) ? (
                  portfolio.projects.map((p, i) => (
                    <div key={i} className="mb-3">
                      <h4>{p?.title}</h4>
                      <p className="text-sm text-gray-400">{p?.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No projects</p>
                )}
              </div>

            </div>

          </div>
        ) : (
          <div className="w-1/2 flex items-center justify-center text-gray-400">
            Click Generate Portfolio
          </div>
        )}

      </div>
    </Layout>
  );
};

export default PortfolioBuilder;