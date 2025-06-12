import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/InputForm.css";

const InputForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, algo } = location.state;

  const defaultValues = {
    process: {
      arrival: [0, 1, 2],
      burst: [5, 3, 8],
      priority: [2, 1, 3],
      quantum: 2,
    },
    disk: {
      head: 50,
      requests: [82, 170, 43, 140, 24, 16, 190],
    },
    memory: {
      blocks: [100, 500, 200, 300, 600],
      processes: [212, 417, 112, 426],
    },
  };

  const [input, setInput] = useState(defaultValues[type]);
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    if (type === "process" && algo === "FCFS") {
      const { priority, ...rest } = input;
      setInput({ ...rest });
    }
  }, [type, algo]);

  const handleChange = (key, value) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", input);
    navigate("/result", { state: { input, type, algo } });
  };

  return (
    <div className="form-container">
      <h2>{`${algo} - ${
        type.charAt(0).toUpperCase() + type.slice(1)
      } Input`}</h2>

      <button className="custom-btn" onClick={() => setIsCustom(!isCustom)}>
        {isCustom ? "Use Default Values" : "Use Custom Values"}
      </button>

      <form className="input-form" onSubmit={handleSubmit}>
        {type === "process" && (
          <>
            <label>Arrival Time:</label>
            <input
              type="text"
              value={isCustom ? input.arrival : defaultValues.process.arrival}
              onChange={(e) =>
                handleChange("arrival", e.target.value.split(",").map(Number))
              }
            />
            <label>Burst Time:</label>
            <input
              type="text"
              value={isCustom ? input.burst : defaultValues.process.burst}
              onChange={(e) =>
                handleChange("burst", e.target.value.split(",").map(Number))
              }
            />
            {algo !== "FCFS" && (
              <>
                <label>Priority:</label>
                <input
                  type="text"
                  value={
                    isCustom ? input.priority : defaultValues.process.priority
                  }
                  onChange={(e) =>
                    handleChange(
                      "priority",
                      e.target.value.split(",").map(Number)
                    )
                  }
                />
              </>
            )}
            {["SJF-P", "RR"].includes(algo) && (
              <>
                <label>Quantum Time:</label>
                <input
                  type="number"
                  value={
                    isCustom ? input.quantum : defaultValues.process.quantum
                  }
                  onChange={(e) =>
                    handleChange("quantum", Number(e.target.value))
                  }
                />
              </>
            )}
          </>
        )}

        {type === "disk" && (
          <>
            <label>Initial Head Position:</label>
            <input
              type="number"
              value={isCustom ? input.head : defaultValues.disk.head}
              onChange={(e) => handleChange("head", Number(e.target.value))}
            />
            <label>Disk Requests:</label>
            <input
              type="text"
              value={isCustom ? input.requests : defaultValues.disk.requests}
              onChange={(e) =>
                handleChange("requests", e.target.value.split(",").map(Number))
              }
            />
          </>
        )}

        {type === "memory" && (
          <>
            <label>Block Sizes:</label>
            <input
              type="text"
              value={isCustom ? input.blocks : defaultValues.memory.blocks}
              onChange={(e) =>
                handleChange("blocks", e.target.value.split(",").map(Number))
              }
            />
            <label>Process Sizes:</label>
            <input
              type="text"
              value={
                isCustom ? input.processes : defaultValues.memory.processes
              }
              onChange={(e) =>
                handleChange("processes", e.target.value.split(",").map(Number))
              }
            />
          </>
        )}

        <button type="submit" className="visualize-btn">
          <i className="fas fa-chart-line"></i> Visualize
        </button>
      </form>
    </div>
  );
};

export default InputForm;
