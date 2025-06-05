// Simple Vanilla JS Viewer for Nature's Binary Atlas

document.addEventListener("DOMContentLoaded", () => {
  const viewerDiv = document.getElementById("root");
  const sidebar = document.getElementById("sidebar");

  viewerDiv.style.height = "500px";

  const viewer = $3Dmol.createViewer(viewerDiv, {
    defaultcolors: $3Dmol.rasmolElementColors
  });

  viewer.addModelFromUrl("https://files.rcsb.org/download/2J4W.pdb", "pdb", function(model) {
    model.setStyle({}, { cartoon: { color: 'spectrum' } });
    viewer.zoomTo();
    viewer.render();
  });

  // Sidebar content
  sidebar.innerHTML = `
    <h2>Plasmodium vivax Apical Structure</h2>
    <p><strong>PDB ID:</strong> <a href="https://www.rcsb.org/structure/2J4W" target="_blank">2J4W</a></p>
    <p><strong>Binary:</strong><br><code>10101110101110111101100110110101100100101001001100010101</code></p>
    <p><strong>Carbon Glyphs:</strong><br>✺✺❀❀✶⚗☍✷♁☿</p>
    <p><strong>Annotation:</strong><br>Chromosome 23, mutation signal, molecular structure link</p>
  `;
});