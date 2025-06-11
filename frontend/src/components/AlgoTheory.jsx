import React, { useEffect, useState } from "react";

const AlgoTheory = ({ algo, type }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheory = async () => {
      setLoading(true);
      try {
        const response = await fetch("/algorithm_theory.json");
        const data = await response.json();

        const rawKey = algo.toLowerCase().replace(/\s+/g, "_");
        let key = rawKey;
        if (rawKey === "fcfs" && type === "disk") key = "disk_fcfs";
      
        const matched = data[key] || data[algo.toLowerCase()] || null;

        if (matched) {
          setSummary(matched.summary);
        } else {
          setSummary("❌ No theory available for this algorithm.");
        }
      } catch (err) {
        setSummary("❌ Failed to load theory.");
      }
      setLoading(false);
    };

    if (algo) fetchTheory();
  }, [algo]);

  return (
    <div className="algo-theory" style={{ marginTop: "30px" }}>
      <h3>📚 About this Algorithm:</h3>
      {loading ? (
        <p>Loading theory...</p>
      ) : (
        <p
          style={{
            lineHeight: "1.8",
            whiteSpace: "pre-line",
            fontSize: "1rem",
            color: "#333",
          }}
          dangerouslySetInnerHTML={{ __html: summary }}
        ></p>
      )}
    </div>
  );
};

export default AlgoTheory;
