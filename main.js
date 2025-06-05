
import React from "react";

// Dummy fallback viewer since MolecularViewer is missing
function MolecularViewer({ pdbId }) {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#ccc",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.2em",
      color: "#333"
    }}>
      3D Viewer Placeholder for {pdbId}
    </div>
  );
}

const atlasData = [
  {
    id: "2J4W",
    title: "Plasmodium vivax Apical Structure",
    binary: "10101110101110111101100110110101100100101001001100010101",
    glyphs: "✺✺❀❀✶⚗☍✷♁☿",
    annotation: "Chromosome 23, mutation signal, molecular structure link",
    link: "https://www.rcsb.org/structure/2J4W",
    tags: ["chromosome", "mutation"]
  },
  {
    id: "KMF5",
    title: "Memory Sequence Marker",
    binary: "11101010101111110111010110110100110000",
    glyphs: "⚳⚗♇♃✹✽☉✻✺✼",
    annotation: "Memory chip signal encoding sequence",
    tags: ["memory", "signal"]
  }
];

export default function NatureBinaryAtlas() {
  const current = atlasData[0];

  return (
    <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
      {/* 3D Viewer */}
      <div style={{ flex: 2, height: "600px", marginRight: "20px" }}>
        <MolecularViewer pdbId={current.id} />
      </div>

      {/* Metadata Panel */}
      <div style={{
        flex: 1,
        background: "#f5f5f5",
        padding: "15px",
        borderRadius: "8px"
      }}>
        <h2>{current.title}</h2>
        <p>
          <strong>Binary:</strong> <code>{current.binary}</code>
        </p>
        <p>
          <strong>Glyphs:</strong>{" "}
          <span style={{ fontSize: "1.5em" }}>{current.glyphs}</span>
        </p>
        <p>
          <strong>Annotation:</strong><br /> {current.annotation}
        </p>
        <p>
          <strong>Tags:</strong>{" "}
          {current.tags.map((tag) => (
            <span
              key={tag}
              style={{
                marginRight: "8px",
                background: "#ddd",
                padding: "2px 6px",
                borderRadius: "4px"
              }}
            >
              {tag}
            </span>
          ))}
        </p>
        {current.link && (
          <p>
            <a href={current.link} target="_blank" rel="noopener noreferrer">
              🔗 View Structure
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
