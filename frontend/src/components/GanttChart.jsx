import React, { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";

const GanttChart = ({ results }) => {
  const ganttRef = useRef(null);

  useEffect(() => {
    if (!ganttRef.current) return;

    const tasks = results.map((proc) => ({
      id: `P${proc.pid}`,
      name: `Process ${proc.pid}`,
      start: new Date(2024, 0, 1, 0, proc.start_time),
      end: new Date(2024, 0, 1, 0, proc.completion_time),
      progress: 100,
    }));

    new Gantt(ganttRef.current, tasks);
  }, [results]);

  return <div ref={ganttRef} className="gantt-container"></div>;

};

export default GanttChart;
