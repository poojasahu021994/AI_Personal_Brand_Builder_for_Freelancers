import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";

const API_URL = "https://poojacodes.pythonanywhere.com/api/projects/";

const Projects = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    link: "",
    image: "",
    price: ""
  });

  const [projects, setProjects] = useState([]);

  // INPUT HANDLER
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ADD PROJECT
  const handleAdd = async () => {
    if (!form.title || !form.description) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // RESET FORM (IMPORTANT FIX)
      setForm({
        title: "",
        description: "",
        tech: "",
        link: "",
        image: "",
        price: ""
      });

      fetchProjects();
    } catch (err) {
      console.log("Add error:", err);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">

        {/* FORM */}
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4"> Add New Project</h2>

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

          <input
            className="w-full p-2 border rounded mb-3"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="Live Link"
          />

          <input
            className="w-full p-2 border rounded mb-3"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
          />

          <input
            className="w-full p-2 border rounded mb-3"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Project Price (₹)"
          />

          <button
            onClick={handleAdd}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded hover:opacity-90"
          >
            Add Project
          </button>
        </div>

        {/* CARDS */}
        <div className="max-w-6xl mx-auto mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
            >

              {/* IMAGE */}
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-40 w-full object-cover"
                />
              )}

              <div className="p-4">

                {/* TITLE */}
                <h3 className="text-xl font-bold">{p.title}</h3>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm mt-2">
                  {p.description}
                </p>

                {/* TECH */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech?.split(",").map((t, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                    >
                      {t.trim()}
                    </span>
                  ))}
                </div>

                {/* PRICE */}
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-green-600 font-bold text-lg">
                    ₹ {p.price}
                  </span>
                </div>

                {/* BUTTON */}
                <Link
                  to={`/project/${p.id}`}
                  className="text-sm text-white bg-purple-600 px-3 py-1 rounded mt-3 inline-block"
                >
                  View Details
                </Link>

              </div>
            </div>
          ))}

        </div>
      </div>
    </Layout>
  );
};

export default Projects;