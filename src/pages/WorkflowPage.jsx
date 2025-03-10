import React from "react";
import WorkflowCanvas from "../components/WorkflowCanvas";
import WorkflowTable from "../components/WorkFlowTable";

const WorkflowPage = () => {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
     
     <div style={{ flex: 6, borderRight: "1px solid #ddd", padding: "10px", overflow: "auto" }}>
        <WorkflowCanvas />
      </div>

     
      <div style={{ flex: 4, padding: "10px", overflow: "auto" }}>
        <WorkflowTable />
      </div>
    </div>
  );
};

export default WorkflowPage;
