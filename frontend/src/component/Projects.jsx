import React, { useEffect, useState } from "react";
import Layout from "./Layout";

const API_URL = "http://127.0.0.1:8000/api/projects/";

const Projects = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
  });

  const [projects, setProjects] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchProjects = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/projects_api");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAdd = async () => {
    if (!form.title || !form.description) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ title: "", description: "", tech: "" });
    fetchProjects();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        
        {/* FORM CARD */}
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">🚀 Add Project</h2>

          <input
            className="w-full p-2 border rounded mb-3"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Project Title"
          />

          <textarea
            className="w-full p-2 border rounded mb-3"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Project Description"
          />

          <input
            className="w-full p-2 border rounded mb-3"
            name="tech"
            value={form.tech}
            onChange={handleChange}
            placeholder="Tech Stack (React, Django...)"
          />

          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Project
          </button>
        </div>

        {/* PROJECT LIST */}
        <div className="max-w-4xl mx-auto mt-8 grid md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-gray-600 mt-2">{p.description}</p>
              <span className="text-sm text-blue-500 mt-3 block">
                ⚡ {p.tech}
              </span>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
};

export default Projects;