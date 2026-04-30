import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import {
  FolderKanban,
  Users,
  BarChart3,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await axios.get(
        "https://poojacodes.pythonanywhere.com/api/projects/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(res.data);
    } catch (error) {
      console.log("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalProjects = projects.length;
  const portfolioScore = totalProjects > 0 ? 85 : 70;
  const clientRequests = 12;

  return (
    <Layout>
      <div className="p-6 min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
            <Sparkles className="text-indigo-600" />
            Dashboard
          </h2>

          <p className="text-gray-500 mt-2">
            Welcome back 👋 Here’s your portfolio overview.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Score */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-500 font-medium">
                Portfolio Score
              </h3>
              <BarChart3 className="text-indigo-600" />
            </div>

            <p className="text-4xl font-bold text-indigo-600 mt-4">
              {portfolioScore}%
            </p>

            <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${portfolioScore}%` }}
              ></div>
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-500 font-medium">
                Total Projects
              </h3>
              <FolderKanban className="text-green-600" />
            </div>

            <p className="text-4xl font-bold text-green-600 mt-4">
              {loading ? "..." : totalProjects}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Projects added in portfolio
            </p>
          </div>

          {/* Client Requests */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-500 font-medium">
                Client Requests
              </h3>
              <Users className="text-pink-600" />
            </div>

            <p className="text-4xl font-bold text-pink-600 mt-4">
              {clientRequests}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              New incoming requests
            </p>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="mt-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white">
          <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
            <TrendingUp className="text-indigo-600" />
            Recent Projects
          </h3>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : projects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-gray-200 hover:shadow-md transition"
                >
                  <h4 className="font-semibold text-lg text-gray-800">
                    {project.title}
                  </h4>

                  <p className="text-gray-500 text-sm mt-1">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No projects added yet.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;