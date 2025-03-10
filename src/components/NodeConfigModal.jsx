import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const NodeConfigModal = ({ selectedNode, onClose, setNodes }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: selectedNode?.data || {}, // Pre-fill form with node data
  });

  useEffect(() => {
    if (selectedNode?.id) {
      const savedData = sessionStorage.getItem(`nodeData-${selectedNode.id}`);
      if (savedData) {
        reset(JSON.parse(savedData)); // Reset form with stored data
      }
    }
  }, [selectedNode, reset]);

  const onSubmit = (data) => {
    const updatedNode = { ...selectedNode, data };

    // Update the React Flow nodes
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === selectedNode.id ? updatedNode : node
      )
    );

    // Save temporary data in sessionStorage
    sessionStorage.setItem(`nodeData-${selectedNode.id}`, JSON.stringify(data));

    onClose(); // Close modal after saving
  };

  // Function to render form based on node type
  const renderFormFields = () => {
    switch (selectedNode?.type) {
      case "addTask":
        return (
          <>
            <div>
              <label>Task Name: </label>
              <input {...register("taskName")} placeholder="Enter task name" />
              <br />
              <label>Assignee: </label>
              <input {...register("assignee")} placeholder="Enter assignee name" />
              <br />
              <label>Due Date: </label>
              <input type="date" {...register("dueDate")} />
            </div>
          </>
        );

      case "addCondition":
        return (
          <>
            <div>
              <label>Condition Name: </label>
              <input {...register("conditionName")} placeholder="Enter condition name" />
              <br />
              <label>Condition Type: </label>
              <select {...register("conditionType")} style={{ height: "30px", width: "max-content" }}>
                <option value="equals">Equals</option>
                <option value="greaterThan">Greater Than</option>
                <option value="lessThan">Less Than</option>
              </select>
              <br />
              <label>Value: </label>
              <input {...register("conditionValue")} placeholder="Enter value" />
            </div>
          </>
        );

      case "notification":
        return (
          <>
            <div>
              <label>Notification Message: </label>
              <textarea {...register("message")} placeholder="Enter message" style={{ top: "20px" }} />
              <br />
              <label>Recipient: </label>
              <input {...register("recipient")} placeholder="Enter recipient name" />
              <br />
              <label>Priority: </label>
              <select {...register("priority")} style={{ height: "25px", width: "max-content" }}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </>
        );

      default:
        return (
          <>
            <label>Label</label>
            <input {...register("label")} placeholder="Enter label" />
          </>
        );
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "400px",
        height: "100vh",
        fontSize: "18px",
        fontFamily: "sans-serif",
        fontWeight: "bold",
        color: "#eee7e7",
        background: "rgb(78 73 73)",
        boxShadow: "rgb(255 246 246 / 69%) -2px 0px 5px",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <h3>Configure {selectedNode?.type}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderFormFields()}
        <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", padding: "10px" }}>
          <button type="submit" style={{ padding: "9px", fontSize: "16px", fontWeight: "bold" }}>Save</button>
          <button type="button" onClick={onClose} style={{ padding: "9px", fontSize: "16px", fontWeight: "bold" }}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default NodeConfigModal;
