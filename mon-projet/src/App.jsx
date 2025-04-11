import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import CandidatureStage from "./pages/CandidatureStage";
import PlusInformation from "./pages/PlusInformations" ;
import Contact from "./pages/Contact" ;
import Inscription from "./pages/Inscription" ;
import Login from "./pages/Login" ;
import InternDashboard from "./pages/InternDashboard";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
<ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidature-stage" element={<CandidatureStage />} />
        <Route path="/plus-information" element={<PlusInformation />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard" element={<InternDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
