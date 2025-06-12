import React from "react";
import "../style/MemoryVisualizer.css";

const COLORS = [
  "#4a90e2",
  "#50e3c2",
  "#f5a623",
  "#e94e77",
  "#7b61ff",
  "#b8e986",
  "#d0011b",
  "#8b572a",
  "#2d9cdb",
];

const MemoryVisualizer = ({ blocks, totalMemory }) => {
  const uniqueProcesses = Array.from(
    new Set(blocks.map((b) => b.process).filter((p) => p !== "Free"))
  );

  const colorMap = {};
  uniqueProcesses.forEach((p, idx) => {
    colorMap[p] = COLORS[idx % COLORS.length];
  });

  return (
    <div className="memory-container">
      {/* Memory layout blocks */}
      <div className="memory-visualizer">
        {blocks.map((block, index) => {
          const width = ((block.end - block.start) / totalMemory) * 100;
          const isFree = block.process === "Free";
          const label = `${block.process} (${block.end - block.start})`;

          return (
            <div
              key={index}
              className="memory-block"
              style={{
                width: `${width}%`,
                backgroundColor: isFree ? "#bbb" : colorMap[block.process],
                color: isFree ? "#222" : "#fff",
              }}
              title={`Block ${index + 1}
Process: ${block.process}
Size: ${block.end - block.start}
Range: ${block.start} - ${block.end}`}
            >
              <span>{label}</span>
            </div>
          );
        })}
      </div>

      {/* Color-coded legend */}
      <div className="legend">
        {uniqueProcesses.map((name, idx) => (
          <div key={idx} className="legend-item">
            <span
              className="color-box"
              style={{ backgroundColor: colorMap[name] }}
            ></span>
            {name}
          </div>
        ))}
        {blocks.some((b) => b.process === "Free") && (
          <div className="legend-item">
            <span className="color-box free-box"></span> Free
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryVisualizer;
