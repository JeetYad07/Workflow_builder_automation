import React from "react";
import { Handle, Position } from "reactflow";

const nodeStyles = {
  addTask: { background: "#4caf50", color: "white", borderRadius: 5, padding: 10, cursor: "grab" },
  addCondition: { background: "#ff5722", color: "white", borderRadius: 5, padding: 10, cursor: "grab" },
  notification: { background: "#2196f3", color: "white", borderRadius: 5, padding: 10, cursor: "grab" },
};

const CustomNode = ({ data, type }) => {
  return (
    <div style={nodeStyles[type] || nodeStyles.notification}>
      <strong>{data?.label || "New Node"}</strong>
      {data?.description && <p>{data.description}</p>}
      {/* Handles for connections */}
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default CustomNode;
