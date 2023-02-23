import React, { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";

function App() {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [radius, setRadius] = useState(10);
  const [drawState, setDrawState] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [end, setEnd] = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDrawState(true);
    setStart({ x, y });
    setEnd({ x, y });
  };

const onMouseMove = (e) => {
  if (!drawState) {
    return;
  }

  const rect = canvasRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const context = canvasRef.current.getContext("2d");
  context.setLineDash([5, 5]);

  // Clear previous dashed border
  context.clearRect(start.x, start.y, end.x - start.x, end.y - start.y);

  // Draw white rectangle over previous dashed border
  context.beginPath();
  context.fillStyle = "#ffffff";
  context.rect(start.x + 1, start.y + 1, end.x - start.x - 2, end.y - start.y - 2);
  context.fill();
  context.closePath();

  // Update end coordinates and draw new dashed border
  setEnd({ x, y });
  context.beginPath();
  context.strokeStyle = color;
  context.rect(start.x + 1, start.y + 1, x - start.x - 2, y - start.y - 2);
  context.stroke();
  context.closePath();
};

  const onMouseUp = (e) => {
    setDrawState(false);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const context = canvasRef.current.getContext("2d");
    context.setLineDash([]);
    context.beginPath();
    context.rect(start.x, start.y, x - start.x, y - start.y);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  };

  return (
    <>
      <div className="controls">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button onClick={() => canvasRef.current.undo()}>Undo</button>
        <button onClick={() => canvasRef.current.clear()}>Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight - 50}
        style={{ border: "1px solid black" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
    </>
  );
}

export default App;
