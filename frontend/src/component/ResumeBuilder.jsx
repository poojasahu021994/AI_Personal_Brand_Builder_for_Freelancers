import React, { useState, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import Layout from "./Layout";

const ResumeBuilder = () => {
  const resumeRef = useRef();

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      console.error(error);
      alert("Error generating resume");
    }
  };

  // PDF Download Function
  const handleDownload = () => {
    const element = resumeRef.current;

    const options = {
      margin: 0.3,
      filename: `${form.name || "resume"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">AI Resume Builder</h2>

      <div className="flex gap-8 p-6 bg-gray-50 min-h-screen">

        {/* FORM */}
        <div className="w-1/2 bg-white p-6 rounded-2xl shadow-lg border">

          <input name="name" placeholder="Full Name" onChange={handleChange} className="input-style" />
          <input name="email" placeholder="Email" onChange={handleChange} className="input-style" />
          <input name="phone" placeholder="Phone" onChange={handleChange} className="input-style" />
          <input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} className="input-style" />

          <textarea name="summary" placeholder="Summary" onChange={handleChange} className="input-style" />
          <textarea name="skills" placeholder="Skills" onChange={handleChange} className="input-style" />
          <textarea name="experience" placeholder="Experience" onChange={handleChange} className="input-style" />
          <textarea name="projects" placeholder="Projects" onChange={handleChange} className="input-style" />
          <textarea name="education" placeholder="Education" onChange={handleChange} className="input-style" />

          <button
            onClick={handleGenerate}
            className="mt-4 bg-indigo-600 text-white p-3 w-full rounded-xl"
          >
            Generate Resume
          </button>

          {/* DOWNLOAD BUTTON */}
          {resume && (
            <button
              onClick={handleDownload}
              className="mt-3 bg-green-600 text-white p-3 w-full rounded-xl"
            >
              Download Resume
            </button>
          )}
        </div>

        {/* PREVIEW */}
        {resume ? (
          <div
            ref={resumeRef}
            className="w-1/2 bg-white shadow-2xl rounded-2xl overflow-hidden flex"
          >
            {/* LEFT */}
            <div className="w-1/3 bg-indigo-700 text-white p-6 space-y-4">
              <h1 className="text-xl font-bold">{form.name}</h1>

              <div>
                <p>{form.email}</p>
                <p>{form.phone}</p>
                <p>{form.linkedin}</p>
              </div>

              <div>
                <h2 className="font-bold">Skills</h2>
                <ul>
                  {(resume.skills || []).map((skill, i) => (
                    <li key={i}>• {skill}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-2/3 p-6 space-y-4 text-sm">

              <div>
                <h2 className="font-bold text-indigo-600">Summary</h2>
                <p>{resume.summary}</p>
              </div>

              <div>
                <h2 className="font-bold text-indigo-600">Experience</h2>
                <p>{resume.experience}</p>
              </div>

              <div>
                <h2 className="font-bold text-indigo-600">Projects</h2>
                <p>{resume.projects}</p>
              </div>

              <div>
                <h2 className="font-bold text-indigo-600">Education</h2>
                <p>{resume.education}</p>
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