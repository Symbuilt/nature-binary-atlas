// Nature's Binary Atlas: 3D Viewer + Glyph Canvas Editor

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

  // ----------------- GLYPH CANVAS -----------------
  const canvasContainer = document.createElement("div");
  canvasContainer.style.marginTop = "2rem";

  const glyphTitle = document.createElement("h2");
  glyphTitle.innerText = "Draw Your Glyph (click squares)";
  glyphTitle.style.color = "#6cf2ff";

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(10, 20px)";
  grid.style.gridGap = "4px";
  grid.style.margin = "1rem 0";

  const cells = [];
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.style.width = "20px";
    cell.style.height = "20px";
    cell.style.border = "1px solid #555";
    cell.style.background = "#222";
    cell.style.cursor = "pointer";
    cell.dataset.active = "false";
    cell.addEventListener("click", () => {
      const isActive = cell.dataset.active === "true";
      cell.dataset.active = (!isActive).toString();
      cell.style.background = isActive ? "#222" : "#6cf2ff";
    });
    grid.appendChild(cell);
    cells.push(cell);
  }

  const annotationInput = document.createElement("textarea");
  annotationInput.placeholder = "Annotation or description...";
  annotationInput.style.width = "100%";
  annotationInput.style.marginBottom = "0.5rem";

  const saveButton = document.createElement("button");
  saveButton.innerText = "Save Glyph";
  saveButton.style.padding = "0.5rem 1rem";
  saveButton.style.background = "#6cf2ff";
  saveButton.style.border = "none";
  saveButton.style.cursor = "pointer";
  saveButton.addEventListener("click", () => {
    const binary = cells.map(c => c.dataset.active === "true" ? "1" : "0").join("");
    const entry = {
      id: "USR" + Date.now(),
      binary: binary,
      annotation: annotationInput.value || "User-created glyph",
    };
    const data = JSON.parse(localStorage.getItem("glyphEntries") || "[]");
    data.push(entry);
    localStorage.setItem("glyphEntries", JSON.stringify(data));
    annotationInput.value = "";
    cells.forEach(c => {
      c.dataset.active = "false";
      c.style.background = "#222";
    });
    renderEntries();
  });

  canvasContainer.appendChild(glyphTitle);
  canvasContainer.appendChild(grid);
  canvasContainer.appendChild(annotationInput);
  canvasContainer.appendChild(saveButton);
  sidebar.appendChild(canvasContainer);

  // ----------------- DISPLAY ENTRIES -----------------
  const entriesSection = document.createElement("div");
  entriesSection.style.marginTop = "2rem";
  sidebar.appendChild(entriesSection);

  function renderEntries() {
    entriesSection.innerHTML = "<h3 style='color:#6cf2ff'>Saved Glyphs</h3>";
    const data = JSON.parse(localStorage.getItem("glyphEntries") || "[]");
    data.slice().reverse().forEach(entry => {
      const card = document.createElement("div");
      card.style.border = "1px solid #444";
      card.style.padding = "0.5rem";
      card.style.marginBottom = "0.5rem";
      card.style.background = "#181818";
      card.innerHTML = \`
        <code style="font-size:0.8rem;word-wrap:break-word;">\${entry.binary}</code><br/>
        <p style="font-size:0.75rem;color:#aaa">\${entry.annotation}</p>
      \`;
      entriesSection.appendChild(card);
    });
  }

  renderEntries();
});
