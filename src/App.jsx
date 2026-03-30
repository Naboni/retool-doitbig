import { useState } from "react";

export default function App() {
  const [headerText, setHeaderText] = useState(
    "Here comes text with variables",
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <main
          style={{
            flex: 1,
            padding: 32,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <h1>{headerText}</h1>
          <label style={labelStyle}>
            Name
            <input style={inputStyle} type="text" placeholder="Enter name" />
          </label>
          <label style={labelStyle}>
            Age
            <input
              style={inputStyle}
              type="number"
              placeholder="Enter age"
              min={0}
            />
          </label>
        </main>

        <aside
          style={{
            width: 400,
            borderLeft: "1px solid #e0e0e0",
            background: "#f9f9f9",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <h2
            style={{
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#888",
            }}
          >
            Text
          </h2>
          <textarea
            style={inputStyle}
            type="text"
            value={headerText}
            onChange={(e) => setHeaderText(e.target.value)}
            placeholder="Header text"
          />
        </aside>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  fontSize: "0.9rem",
  color: "#444",
  maxWidth: 300,
};
const inputStyle = {
  padding: "8px 12px",
  border: "1px solid #ccc",
  borderRadius: 6,
  fontSize: "1rem",
};
