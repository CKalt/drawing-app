import React from "react";

function Controls({ color, onColorChange }) {
  return (
    <div className="controls">
      <input
        type="color"
        value={color}
        onChange={(e) => onColorChange(e)}
      />
      <button onClick={() => console.log("Undo")}>Undo</button>
      <button onClick={() => console.log("Clear")}>Clear</button>
    </div>
  );
}

export default Controls;
