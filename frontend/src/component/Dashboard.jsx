import React from "react";
import Layout from "./Layout";

const Dashboard = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">
        
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">PortfolioBuilder Score</h3>
          <p className="text-2xl font-bold text-indigo-600">80%</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Projects</h3>
          <p className="text-2xl font-bold">5</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Client Requests</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
         

      </div>
    </Layout>
  );
};

export default Dashboard;