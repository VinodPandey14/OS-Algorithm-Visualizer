import React, { useState, useEffect } from "react";
import "../style/DiskSchedulingVisualizer.css";

const DiskSchedulingVisualizer = ({ data }) => {
  const diskSize = 200;
  const margin = 80; 
  const width = 1000;
  const height = 200; 

  const scaleX = (pos) =>
    margin + (pos / (diskSize - 1)) * (width - 2 * margin);

  const { initial_head, seek_sequence } = data;

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!seek_sequence || seek_sequence.length === 0) return;

    if (currentStep < seek_sequence.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, seek_sequence]);

  const segments = [];
  for (let i = 0; i < seek_sequence.length - 1; i++) {
    const start = seek_sequence[i];
    const end = seek_sequence[i + 1];
    segments.push({
      start,
      end,
      direction: end > start ? "right" : "left",
    });
  }

  return (
    <div className="disk-visualizer-container">
      <svg
        className="disk-visualizer-svg"
        width={width}
        height={height}
        style={{ border: "1px solid #ccc", background: "#fff" }}
      >
        {/* Base line */}
        <line
          x1={scaleX(0)}
          y1={height / 2}
          x2={scaleX(diskSize - 1)}
          y2={height / 2}
          stroke="#aaa"
          strokeWidth={2}
        />

        {/* Request points and labels */}
        {seek_sequence.map((pos, i) => (
          <g key={i}>
            <circle
              cx={scaleX(pos)}
              cy={height / 2}
              r={8}
              fill={pos === initial_head ? "orange" : "steelblue"}
              stroke="#333"
              strokeWidth={1}
            />
            <text
              x={scaleX(pos)}
              y={height / 2 + 25}
              textAnchor="middle"
              fill="#222"
              fontSize="12"
              fontWeight={pos === initial_head ? "bold" : "normal"}
            >
              {pos}
            </text>
          </g>
        ))}

        {/* Arrows for all segments */}
        {segments.map(({ start, end, direction }, i) => {
          const x1 = scaleX(start);
          const x2 = scaleX(end);
          const arrowColor = direction === "right" ? "green" : "blue";
          const arrowSize = 8;
          const arrowY = height / 2;

          const arrowPoints =
            direction === "right"
              ? `${x2 - arrowSize},${arrowY - arrowSize / 2} ${x2},${arrowY} ${
                  x2 - arrowSize
                },${arrowY + arrowSize / 2}`
              : `${x2 + arrowSize},${arrowY - arrowSize / 2} ${x2},${arrowY} ${
                  x2 + arrowSize
                },${arrowY + arrowSize / 2}`;

          return (
            <g key={i}>
              <line
                x1={x1}
                y1={arrowY}
                x2={x2}
                y2={arrowY}
                stroke={arrowColor}
                strokeWidth={3}
                strokeDasharray="4 2"
              />
              <polygon points={arrowPoints} fill={arrowColor} />
            </g>
          );
        })}

        {/* Animated head circle */}
        {seek_sequence.length > 0 && (
          <circle
            cx={scaleX(seek_sequence[currentStep])}
            cy={height / 2}
            r={12}
            fill="orange"
            stroke="red"
            strokeWidth={3}
            style={{ filter: "drop-shadow(0 0 6px orange)" }}
          />
        )}

        {/* Labels for initial head and disk bounds */}
        <text
          x={scaleX(initial_head)}
          y={height / 2 - 25}
          textAnchor="middle"
          fill="orange"
          fontWeight="bold"
        >
          Initial Head
        </text>
        <text x={scaleX(0)} y={height / 2 + 55} textAnchor="middle" fill="#555">
          0
        </text>
        <text
          x={scaleX(diskSize - 1)}
          y={height / 2 + 55}
          textAnchor="middle"
          fill="#555"
        >
          {diskSize - 1}
        </text>
      </svg>
    </div>
  );
};

export default DiskSchedulingVisualizer;
