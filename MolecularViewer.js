import React, { useEffect, useRef } from "react";

const MolecularViewer = ({ pdbUrl }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (window.$3Dmol && viewerRef.current) {
      viewerRef.current.innerHTML = "";
      const viewer = window.$3Dmol.createViewer(viewerRef.current, { backgroundColor: "white" });
      viewer.addModelFromUrl(pdbUrl, "pdb", function () {
        viewer.setStyle({}, { cartoon: { color: "spectrum" } });
        viewer.zoomTo();
        viewer.render();
      });
    }
  }, [pdbUrl]);

  return <div ref={viewerRef} style={{ width: "100%", height: "400px" }} />;
};

export default MolecularViewer;