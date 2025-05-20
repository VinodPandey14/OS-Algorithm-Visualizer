import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Gantt from "frappe-gantt";
import "../style/ResultPage.css";

const ResultPage = () => {
  const location = useLocation();
  const { input, type, algo } = location.state || {};

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const ganttRef = useRef(null);

  useEffect(() => {
    if (input && type && algo) {
      const fetchResult = async () => {
        setLoading(true);
        try {
          const response = await axios.post("http://localhost:5000/visualize", {
            inputData: input,
            type: type,
            algo: algo,
          });

          setResult(response.data);
        } catch (error) {
          console.error("Error fetching result:", error);
          setResult(null);
        } finally {
          setLoading(false);
        }
      };

      fetchResult();
    } else {
      setLoading(false);
      setResult("Missing input or algorithm data.");
    }
  }, [input, type, algo]);

  useEffect(() => {
    if (result && Array.isArray(result.gantt) && ganttRef.current) {
      const tasks = result.gantt.map((item, index) => ({
        id: `task-${index}`,
        name: item.process,
        start: item.start,
        end: item.end,
        progress: 100,
      }));

      new Gantt(ganttRef.current, tasks);
    }
  }, [result]);

  return (
    <div className="result-container">
      <h2>
        {type ? type.charAt(0).toUpperCase() + type.slice(1) : ""} Algorithm
        Result
      </h2>

      {loading && <p>Loading...</p>}

      {result && (
        <div className="result-content">
          <h3>Result Output:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>

          {/* <div className="gantt-container" ref={ganttRef}></div> */}
        </div>
      )}

      {!loading && !result && <p>No result available. Please try again.</p>}
    </div>
  );
};

export default ResultPage;
