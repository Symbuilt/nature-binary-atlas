import React from "react";
import MolecularViewer from "./MolecularViewer";

const atlasData = [
  {
    id: "2J4W",
    title: "Plasmodium vivax Apical Structure",
    binary: "10101110101110111101100110110101100100101001001100010101",
    glyphs: "✺✺❀❀✶⚗☍✷♁☿",
    annotation: "Chromosome 23, mutation signal, molecular structure link",
    link: "https://files.rcsb.org/download/2J4W.pdb",
    tags: ["chromosome", "mutation"]
  }
];

export default function NatureBinaryAtlas() {
  const current = atlasData[0];

  return (
    <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
      <div style={{ flex: 2, height: "400px", marginRight: "20px" }}>
        <MolecularViewer pdbUrl={current.link} />
      </div>
      <div style={{ flex: 1, background: "#f5f5f5", padding: "15px", borderRadius: "8px" }}>
        <h2>{current.title}</h2>
        <p><strong>Binary:</strong> <code>{current.binary}</code></p>
        <p><strong>Glyphs:</strong> <span style={{ fontSize: "1.5em" }}>{current.glyphs}</span></p>
        <p><strong>Annotation:</strong><br /> {current.annotation}</p>
        <p><strong>Tags:</strong> {current.tags.join(", ")}</p>
        <p><a href={current.link} target="_blank" rel="noopener noreferrer">🔗 View Raw PDB</a></p>
      </div>
  );
}
