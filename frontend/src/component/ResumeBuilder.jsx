import React, { useState } from "react";
import axios from "axios";
import Layout from "./Layout";

const ResumeBuilder = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    summary: "",
    skills: "",
    experience: "",
    projects: "",
    education: "",
  });

  const [resume, setResume] = useState(null);

  // 🔹 handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 parse AI response
  const parseResume = (text) => {
    const sections = {
      summary: "",
      skills: [],
      experience: "",
      projects: "",
      education: "",
    };

    let current = "";

    text.split("\n").forEach((line) => {
      if (line.includes("SUMMARY")) current = "summary";
      else if (line.includes("SKILLS")) current = "skills";
      else if (line.includes("EXPERIENCE")) current = "experience";
      else if (line.includes("PROJECTS")) current = "projects";
      else if (line.includes("EDUCATION")) current = "education";
      else {
        if (current === "skills" && line.trim().startsWith("-")) {
          sections.skills.push(line.replace("-", "").trim());
        } else {
          sections[current] += line + "\n";
        }
      }
    });

    return sections;
  };

  const handleGenerate = async () => {
    try {
      const res = await axios.post(
        "https://poojacodes.pythonanywhere.com/api/generate-resume/",
        form
      );
 
      console.log("RAW RESPONSE:", res.data.resume);
      console.log(res.data);
      setResume(res.data);

    } catch (error) {
      console.error("ERROR:", error);
      alert("Error generating resume");
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">AI Resume Builder</h2>

      <div className="flex gap-8 p-6 bg-gray-50 min-h-screen">

        {/* ================= FORM ================= */}
        <div className="w-1/2 bg-white p-6 rounded-2xl shadow-lg border">

          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Enter Your Details
          </h2>

          <input name="name" placeholder="Full Name" onChange={handleChange} className="input-style" />
          <input name="email" placeholder="Email" onChange={handleChange} className="input-style" />
          <input name="phone" placeholder="Phone" onChange={handleChange} className="input-style" />
          <input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} className="input-style" />

          <textarea name="summary" placeholder="Professional Summary" onChange={handleChange} className="input-style" />
          <textarea name="skills" placeholder="Skills (comma separated)" onChange={handleChange} className="input-style" />
          <textarea name="experience" placeholder="Experience" onChange={handleChange} className="input-style" />
          <textarea name="projects" placeholder="Projects" onChange={handleChange} className="input-style" />
          <textarea name="education" placeholder="Education" onChange={handleChange} className="input-style" />

          <button
            onClick={handleGenerate}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 transition text-white p-3 w-full rounded-xl font-medium shadow"
          >
            Generate Resume
          </button>
        </div>

        {/* ================= PREVIEW ================= */}
        {resume ? (
        <div className="w-1/2 bg-white shadow-2xl rounded-2xl overflow-hidden flex">

          {/* LEFT SIDEBAR */}
          <div className="w-1/3 bg-indigo-700 text-white p-6 space-y-4">
            <h1 className="text-xl font-bold">{form.name || "Your Name"}</h1>

            <div>
              <p className="text-xs opacity-80">CONTACT</p>
              <p className="text-sm">{form.email}</p>
              <p className="text-sm">{form.phone}</p>
              <p className="text-sm break-words">{form.linkedin}</p>
            </div>

            <div>
              <p className="text-xs opacity-80">SKILLS</p>
              <ul className="text-sm mt-1 space-y-1">
                {(Array.isArray(resume?.skills) ? resume.skills : []).map((skill, i) => (
                  <li key={i}>• {skill}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-2/3 p-6 space-y-5 text-sm text-gray-700">

            <div>
              <h2 className="font-bold text-indigo-600 border-b pb-1 mb-2">
                SUMMARY
              </h2>
              <p>{resume?.summary || "Click Generate Resume"}</p>
            </div>

            <div>
              <h2 className="font-bold text-indigo-600 border-b pb-1 mb-2">
                EXPERIENCE
              </h2>
              <p className="whitespace-pre-line">{resume?.experience}</p>
            </div>

            <div>
              <h2 className="font-bold text-indigo-600 border-b pb-1 mb-2">
                PROJECTS
              </h2>
              <p className="whitespace-pre-line">{resume?.projects}</p>
            </div>

            <div>
              <h2 className="font-bold text-indigo-600 border-b pb-1 mb-2">
                EDUCATION
              </h2>
              <p>{resume?.education}</p>
            </div>

          </div>
        </div>
) : (
  <div className="w-1/2 flex items-center justify-center text-gray-400">
    Click Generate Resume
  </div>
)}
      </div>
    </Layout>
  );
};

export default ResumeBuilder;