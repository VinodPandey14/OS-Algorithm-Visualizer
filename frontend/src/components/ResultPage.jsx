import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../style/ResultPage.css";
import GanttChartGoogle from "./GanttChartGoogle";
import ProcessTimelineSimulator from "./ProcessTimelineSimulator";
import DiskSchedulingVisualizer from "./DiskSchedulingVisualizer";
import MemoryVisualizer from "./MemoryVisualizer";
import AlgoTheory  from "./AlgoTheory";


const ResultPage = () => {
  const location = useLocation();
  const { input, type, algo } = location.state || {};
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const renderSummary = () => {
    if (!result) return null;

    return (
      <div className="result-summary">
        <h3>Summary:</h3>
        <p>
          <strong>Algorithm:</strong> {result.algorithm || "N/A"}
        </p>

        {/* Process Scheduling info */}
        {typeof result.average_waiting_time === "number" && (
          <p>
            <strong>Average Waiting Time:</strong>{" "}
            {result.average_waiting_time.toFixed(2)}
          </p>
        )}

        {typeof result.average_turnaround_time === "number" && (
          <p>
            <strong>Average Turnaround Time:</strong>{" "}
            {result.average_turnaround_time.toFixed(2)}
          </p>
        )}

        {/* Disk Scheduling info */}
        {type === "disk" && (
          <>
            <p>
              <strong>Initial Head Position:</strong> {result.initial_head}
            </p>
            <p>
              <strong>Seek Sequence:</strong>{" "}
              {result.seek_sequence ? result.seek_sequence.join(" → ") : "N/A"}
            </p>
            <p>
              <strong>Total Seek Count:</strong> {result.total_seek_count}
            </p>
            {typeof result.efficiency === "number" && (
              <p>
                <strong>Efficiency:</strong> {result.efficiency.toFixed(2)}%
              </p>
            )}
          </>
        )}

        {/* Memory Management info */}
        {type === "memory" && (
          <>
            <p>
              <strong>Total Memory:</strong> {result.total_memory}
            </p>
            <p>
              <strong>Fragmentation:</strong> {result.fragmentation}
            </p>

            {result.processes.map((process, index) => {
              const blockIndex = result.allocation[index];
              return (
                <p key={index}>
                  <strong>{process.name}</strong> (Size: {process.size}) →{" "}
                  {blockIndex !== -1
                    ? `Allocated to Block ${blockIndex + 1}`
                    : "Not Allocated"}
                </p>
              );
            })}
          </>
        )}
      </div>
    );
  };
  


console.log(result);

const renderVisualization = () => {
  if (!result) return null;

  return (
    <>
      {type === "process" && (
        <>
          <p>
            <strong>Gantt Chart:</strong>
          </p>
          <GanttChartGoogle segments={result.results} />

          <p>
            <strong>Live Execution Timeline:</strong>
          </p>
          <ProcessTimelineSimulator results={result.results} />
        </>
      )}

      {type === "disk" && (
        <>
          <DiskSchedulingVisualizer data={result} />
        </>
      )}

      {type === "memory" && (
        <>
          <p>
            <strong>Memory Layout:</strong>
          </p>
          <MemoryVisualizer
            blocks={result.memory_blocks}
            totalMemory={result.total_memory}
          />
        </>
      )}

      <AlgoTheory algo={algo} type={type} />
    </>
  );
};


  return (
    <div className="result-container">
      <h2>
        {type ? type.charAt(0).toUpperCase() + type.slice(1) : ""} Algorithm
        Result
      </h2>

      {loading && <p>Loading...</p>}

      {result && typeof result === "object" ? (
        <div className="result-content">
          {renderSummary()}
          {renderVisualization()}
        </div>
      ) : (
        !loading && <p>{result || "No result available. Please try again."}</p>
      )}
    </div>
  );
};

export default ResultPage;
