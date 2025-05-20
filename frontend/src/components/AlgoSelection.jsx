import React, { useState } from "react";
import "../style/AlgoSelection.css";
import { useNavigate } from "react-router-dom";

const AlgoSelection = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const handleSelectCategory = (type) => {
    setSelectedType(type);
    setSelectedAlgorithm(null); // Reset selected algorithm when category changes
  };

  const handleSelectAlgorithm = (type, algo) => {
    setSelectedAlgorithm(algo);
    navigate("/input", { state: { type, algo } });
  };

  const renderAlgorithms = () => {
    if (selectedType === "process") {
      return (
        <>
          <div
            className="algo-card"
            onClick={() => handleSelectAlgorithm("process", "FCFS")}
          >
            <h4>FCFS</h4>
          </div>
          <div
            className="algo-card"
            onClick={() => handleSelectAlgorithm("process", "SJF-P")}
          >
            <h4>SJF Preemptive</h4>
          </div>
          <div
            className="algo-card"
            onClick={() => handleSelectAlgorithm("process", "SJF-NP")}
          >
            <h4>SJF Non-Preemptive</h4>
          </div>
          <div
            className="algo-card"
            onClick={() => handleSelectAlgorithm("process", "Priority")}
          >
            <h4>Priority</h4>
          </div>
          <div
            className="algo-card"
            onClick={() => handleSelectAlgorithm("process", "RR")}
          >
            <h4>Round Robin (RR)</h4>
          </div>
        </>
      );
    } else if (selectedType === "disk") {
      return (
        <>
          <div
            className="algo-card"
            onClick={() => handleSelectAlgorithm("disk", "FCFS")}
          >
            <h4>FCFS</h4>
          </div>
          <div
            className="algo-card"
            onClick={() => handleSelectAlgorithm("disk", "C-SCAN")}
          >
            <h4>C-SCAN</h4>
          </div>
          <div
            className="algo-card"
            onClick={() => handleSelectAlgorithm("disk", "SCAN")}
          >
            <h4>SCAN</h4>
          </div>
        </>
      );
    } else if (selectedType === "memory") {
      return (
        <>
          <div
            className="algo-card"
            onClick={() => handleSelectAlgorithm("memory", "First Fit")}
          >
            <h4>First Fit</h4>
          </div>
          <div
            className="algo-card"
            onClick={() => handleSelectAlgorithm("memory", "Best Fit")}
          >
            <h4>Best Fit</h4>
          </div>
          <div
            className="algo-card"
            onClick={() => handleSelectAlgorithm("memory", "Worst Fit")}
          >
            <h4>Worst Fit</h4>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="selection-container">
      <h2>Select Algorithm Category</h2>
      <div className="card-grid">
        <div
          className="algo-card"
          onClick={() => handleSelectCategory("process")}
        >
          <i className="fas fa-tasks"></i>
          <h3>Process Scheduling</h3>
        </div>
        <div className="algo-card" onClick={() => handleSelectCategory("disk")}>
          <i className="fas fa-compact-disc"></i>
          <h3>Disk Scheduling</h3>
        </div>
        <div
          className="algo-card"
          onClick={() => handleSelectCategory("memory")}
        >
          <i className="fas fa-memory"></i>
          <h3>Memory Management</h3>
        </div>
      </div>

      {selectedType && (
        <div className="algorithm-list">
          <h3>
            Select Algorithm for{" "}
            {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
          </h3>
          <div className="algo-list">{renderAlgorithms()}</div>
        </div>
      )}
    </div>
  );
};

export default AlgoSelection;
