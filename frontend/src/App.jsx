import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AlgoSelection from "./components/AlgoSelection";
import InputForm from "./components/InputForm";
import ResultPage from "./components/ResultPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/select" element={<AlgoSelection />} />
          <Route path="/input" element={<InputForm />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
