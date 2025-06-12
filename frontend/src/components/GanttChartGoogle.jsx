import React from "react";
import { Chart } from "react-google-charts";

const GanttChartGoogle = ({ segments }) => {
  if (!segments || segments.length === 0) return null;

  const pidColors = {};

  segments.forEach((seg) => {
    if (!pidColors[seg.pid]) {
      const hue = (seg.pid * 67) % 360;
      pidColors[
        seg.pid
      ] = `stroke-color: #000; fill-color: hsl(${hue}, 70%, 60%)`;
    }
  });

  const data = [
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
      { type: "string", role: "style" },
    ],
    ...segments.map((seg, index) => {
      const start = new Date(2020, 0, 1, 0, seg.start_time);
      const end = new Date(2020, 0, 1, 0, seg.completion_time);
      const style = pidColors[seg.pid];
      return [
        `P${seg.pid}-${index}`,
        `P${seg.pid}`,
        start,
        end,
        null,
        100,
        null,
        style, 
      ];
    }),
  ];

  const options = {
    height: 50 + segments.length * 40,
    gantt: {
      trackHeight: 30,
      labelStyle: {
        fontSize: 14,
        color: "#333",
      },
      barCornerRadius: 3,
    },
  };

  return (
    <Chart
      chartType="Gantt"
      width="100%"
      height={`${options.height}px`}
      data={data}
      options={options}
    />
  );
};

export default GanttChartGoogle;
