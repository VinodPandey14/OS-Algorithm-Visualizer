import React, { useEffect, useState } from "react";
import "../style/ProcessTimelineSimulator.css";

const ProcessTimelineSimulator = ({ results }) => {
  const [time, setTime] = useState(0);
  const [activeProcess, setActiveProcess] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    if (!results || results.length === 0) return;

    const executionSegments = results.map((p) => ({
      pid: p.pid,
      start: p.start_time,
      end: p.completion_time,
    }));

    let tick = 0;
    let currentSegmentIndex = 0;
    const tempTimeline = [];

    const interval = setInterval(() => {
      if (currentSegmentIndex >= executionSegments.length) {
        setActiveProcess(null);
        clearInterval(interval);
        return;
      }

      const current = executionSegments[currentSegmentIndex];

      if (tick < current.start) {
        setActiveProcess(null);
      } else if (tick >= current.start && tick < current.end) {
        setActiveProcess(current.pid);
        tempTimeline.push({ time: tick, pid: current.pid });
        setTimeline([...tempTimeline]);
      } else if (tick >= current.end) {
        completed.push(current.pid);
        currentSegmentIndex++;
      }

      setTime(tick);
      tick++;
    }, 1000);

    return () => clearInterval(interval);
  }, [results]);
            

  const getUniquePIDs = () => {
    const all = results.map((r) => r.pid);
    return [...new Set(all)];
  };

  return (
    <div className="simulator-container">
      <div className="simulator-header">
        <div className="clock">🕒 Time: {time}</div>
        <div className="executing">
          🎯 Executing:{" "}
          {activeProcess ? (
            <span className="active">{activeProcess}</span>
          ) : (
            "Idle"
          )}
        </div>
      </div>

      <div className="ready-queue">
        <p>📥 Ready Queue:</p>
        <div className="queue-box">
          {getUniquePIDs().map((pid, index) => (
            <div
              key={index}
              className={`queue-item ${
                pid === activeProcess
                  ? "executing-now"
                  : completed.includes(pid)
                  ? "completed"
                  : ""
              }`}
            >
              {pid}
            </div>
          ))}
        </div>
      </div>

      <div className="timeline-strip">
        {timeline.map((entry, index) => (
          <div
            key={index}
            className="timeline-box"
            style={{ backgroundColor: getColor(entry.pid) }}
          >
            <span>{entry.pid}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const getColor = (pid) => {
  const colors = {
    P1: "#ff6f61",
    P2: "#6b5b95",
    P3: "#88b04b",
    P4: "#f7cac9",
    P5: "#92a8d1",
    P6: "#955251",
    P7: "#b565a7",
    P8: "#009b77",
  };
  return colors[pid] || "#ccc";
};

export default ProcessTimelineSimulator;
