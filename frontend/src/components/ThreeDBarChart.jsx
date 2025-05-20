import React, { useEffect } from "react";
import { Chart } from "chart.js";

const ThreeDBarChart = ({ results }) => {
  useEffect(() => {
    const ctx = document.getElementById("3dBarChart").getContext("2d");

    const chartData = {
      labels: results.map((result) => `P${result.pid}`), // Process IDs
      datasets: [
        {
          label: "Process Burst Time (3D View)",
          data: results.map((result) => result.burst_time),
          backgroundColor: "#4e73df",
          borderColor: "#2e59d9",
          borderWidth: 1,
        },
      ],
    };

    new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            min: 0,
            max: Math.max(...results.map((result) => result.burst_time)) + 2,
            title: {
              display: true,
              text: "Burst Time",
            },
          },
          x: {
            title: {
              display: true,
              text: "Processes",
            },
          },
        },
        elements: {
          bar: {
            borderWidth: 1,
            borderColor: "rgb(0, 0, 0)",
            backgroundColor: "rgb(75, 192, 192)",
          },
        },
      },
    });
  }, [results]);

  return <canvas id="3dBarChart" width="400" height="200"></canvas>;
};

export default ThreeDBarChart;
