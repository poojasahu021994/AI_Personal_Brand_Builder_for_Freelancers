import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./component/Dashboard";
import PortfolioBuilder from "./component/PortfolioBuilder";
import ResumeBuilder from "./component/ResumeBuilder";
import Projects from "./component/Projects";
import ProjectDetails from "./component/ProjectDetails";
import LandingPage from "./component/LandingPage";
import Register from "./component/Register";
import Login from "./component/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path="/" element={<LandingPage/>}/>
        
        <Route path="/PortfolioBuilder" element={<PortfolioBuilder />} />
        <Route path="/resumeBuilder" element={<ResumeBuilder/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/project/:id" element={ProjectDetails }/>
    <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;