import React from "react";
import { useDispatch } from "react-redux";
import { addNode } from "../store/workflowSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ width:"auto", padding: "px", background: "#ddd"}}>
     <div style={{height:'20px',width:"20px"}}> <h2>Nodes</h2>  </div>
     <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"}}>
     <button onClick={() => dispatch(addNode({ type: "task", position: { x: 250, y: 100 } }))}>
        Add Task Node
      </button>
      <button onClick={() => dispatch(addNode({ type: "condition", position: { x: 300, y: 150 } }))}>
        Add Condition Node
      </button>
      <button onClick={() => dispatch(addNode({ type: "notification", position: { x: 350, y: 200 } }))}>
        Add Notification Node
      </button>
     </div>
    </div>
  );
};

export default Sidebar;
