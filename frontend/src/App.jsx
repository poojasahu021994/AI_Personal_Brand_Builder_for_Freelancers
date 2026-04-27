import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./component/Dashboard";
import PortfolioBuilder from "./component/PortfolioBuilder";
import ResumeBuilder from "./component/ResumeBuilder";
import Projects from "./component/Projects";
// import AIWriter from "./component/AIWriter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/PortfolioBuilder" element={<PortfolioBuilder />} />
        {/* <Route path="/ai" element={<AIWriter />} /> */}
        <Route path="/resumeBuilder" element={<ResumeBuilder/>}/>
        <Route path="/projects" element={<Projects/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;