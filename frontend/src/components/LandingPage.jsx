import React from "react";

const LandingPage = ({ onEnter }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%", textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            background: "#1e1e35",
            border: "1px solid #2a2a4a",
            color: "#e040fb",
            fontSize: "0.78rem",
            padding: "0.3rem 0.9rem",
            borderRadius: "20px",
            marginBottom: "1.5rem",
          }}
        >
          🎬 movie recommendations
        </div>

        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            color: "#f0f0f0",
            lineHeight: "1.2",
            marginBottom: "1.2rem",
          }}
        >
          Find your next
          <br />
          <span style={{ color: "#e040fb" }}>favorite film.</span>
        </h1>

        <p
          style={{
            fontSize: "1.05rem",
            color: "#888",
            lineHeight: "1.7",
            maxWidth: "420px",
            margin: "0 auto 2rem",
          }}
        >
          Tell CineBot what you're in the mood for and it'll suggest something
          worth watching.
        </p>

        <button
          onClick={onEnter}
          onMouseEnter={(e) => (e.target.style.background = "#9333ea")}
          onMouseLeave={(e) => (e.target.style.background = "#7c3aed")}
          style={{
            background: "#7c3aed",
            color: "#fff",
            border: "none",
            padding: "0.85rem 2.2rem",
            borderRadius: "10px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            display: "block",
            margin: "0 auto 2rem",
          }}
        >
          Start chatting
        </button>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
            marginBottom: "3rem",
          }}
        >
          {[
            "action movies",
            "something scary",
            "feel good films",
            "sci-fi classics",
          ].map((tag, i) => (
            <span
              key={i}
              style={{
                background: "#1e1e35",
                border: "1px solid #2a2a4a",
                color: "#aaa",
                fontSize: "0.82rem",
                padding: "0.3rem 0.8rem",
                borderRadius: "20px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
          }}
        >
          <div
            style={{
              background: "#1a1a2e",
              border: "1px solid #2a2a4a",
              borderRadius: "12px",
              padding: "1.2rem 1rem",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: "1.4rem", marginBottom: "0.6rem" }}>💬</div>
            <div
              style={{
                color: "#f0f0f0",
                fontWeight: "600",
                fontSize: "0.95rem",
                marginBottom: "0.4rem",
              }}
            >
              Just chat
            </div>
            <div
              style={{ color: "#666", fontSize: "0.82rem", lineHeight: "1.5" }}
            >
              Describe what you want in plain words. No filters, no forms.
            </div>
          </div>
          <div
            style={{
              background: "#1a1a2e",
              border: "1px solid #2a2a4a",
              borderRadius: "12px",
              padding: "1.2rem 1rem",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: "1.4rem", marginBottom: "0.6rem" }}>🎯</div>
            <div
              style={{
                color: "#f0f0f0",
                fontWeight: "600",
                fontSize: "0.95rem",
                marginBottom: "0.4rem",
              }}
            >
              Get picks
            </div>
            <div
              style={{ color: "#666", fontSize: "0.82rem", lineHeight: "1.5" }}
            >
              CineBot suggests specific movies by name, not generic lists.
            </div>
          </div>
          <div
            style={{
              background: "#1a1a2e",
              border: "1px solid #2a2a4a",
              borderRadius: "12px",
              padding: "1.2rem 1rem",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: "1.4rem", marginBottom: "0.6rem" }}>📁</div>
            <div
              style={{
                color: "#f0f0f0",
                fontWeight: "600",
                fontSize: "0.95rem",
                marginBottom: "0.4rem",
              }}
            >
              Save the chat
            </div>
            <div
              style={{ color: "#666", fontSize: "0.82rem", lineHeight: "1.5" }}
            >
              Export the conversation as JSON anytime you want.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
