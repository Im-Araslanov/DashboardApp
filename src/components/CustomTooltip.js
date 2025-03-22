import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{
        backgroundColor: "#4318FF",
        border: "none",
        borderRadius: "8px",
        padding: "10px",
        textAlign: "center",
      }}>
        <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: "bold", color: "#FFFFFF" }}>
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={`tooltip-${index}`} style={{ margin: "5px 0", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#FFFFFF" }}>
            {entry.name}: <strong>{entry.value}</strong>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;