import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://poojacodes.pythonanywhere.com/api/projects/";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(`${API_URL}${id}/`);
      const data = await res.json();
      setProject(data);
    };

    fetchProject();
  }, [id]);

  if (!project) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-lg p-6">

        {project.image && (
          <img
            src={project.image}
            className="w-full h-60 object-cover rounded-xl mb-4"
          />
        )}

        <h1 className="text-3xl font-bold">{project.title}</h1>

        <p className="mt-3 text-gray-600">{project.description}</p>

        <div className="mt-4">
          <span className="font-semibold">Tech Stack:</span>
          <p className="text-blue-600">{project.tech}</p>
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            className="mt-4 inline-block text-white bg-purple-600 px-4 py-2 rounded"
          >
            Visit Project
          </a>
        )}

      </div>
    </div>
  );
};

export default ProjectDetails;