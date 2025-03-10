import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, { addEdge, Controls, Background, useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";
import { useSelector, useDispatch } from "react-redux";
import {addEdge as addEdgeAction,updateNodes,updateEdges,undo,redo,} from "../store/workflowSlice";
import CustomNode from "./CustomNode";
import NodeConfigModal from "./NodeConfigModal";

const nodeTypes = {
  addTask: CustomNode,
  addCondition: CustomNode,
  notification: CustomNode,
};

const WorkflowCanvas = () => {
  const dispatch = useDispatch();
  const { nodes: initialNodes, edges: initialEdges } = useSelector((state) => state.workflow);

  // Load nodes from sessionStorage on mount
  const storedNodes = JSON.parse(sessionStorage.getItem("workflowNodes")) || initialNodes;

  // ReactFlow's state hooks for nodes & edges
  const [nodes, setNodes, onNodesChange] = useNodesState(storedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    sessionStorage.setItem("workflowNodes", JSON.stringify(nodes));
  }, [nodes]);

  const onConnect = useCallback(
    (connection) => {
      const newEdge = addEdge(connection, edges);
      setEdges(newEdge);
      dispatch(addEdgeAction(newEdge));
    },
    [dispatch, edges, setEdges]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        const filteredNodes = nodes.filter((node) => !node.selected);
        setNodes(filteredNodes);
        dispatch(updateNodes(filteredNodes));
      } else if (event.ctrlKey && event.key === "z") {
        dispatch(undo());
      } else if (event.ctrlKey && event.key === "y") {
        dispatch(redo());
      }
    },
    [dispatch, nodes, setNodes]
  );

  const addNewNode = (type) => {
    const newNode = {
        id: `node-${nodes.length + 1}`,
        name: name ? null : `${type}${nodes.length + 1}`, // Proper ternary condition
        type,
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { label: type },
      };
      

    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    dispatch(updateNodes(updatedNodes));

    sessionStorage.setItem("workflowNodes", JSON.stringify(updatedNodes));
  };

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }} tabIndex={0} onKeyDown={handleKeyDown}>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
        <button onClick={() => addNewNode("addTask")} style={{ marginRight: 5 }}>
          ➕ Add Task
        </button>
        <button onClick={() => addNewNode("addCondition")} style={{ marginRight: 5 }}>
          ➕ Add Condition
        </button>
        <button onClick={() => addNewNode("notification")}>➕ Add Notification</button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={(changes) => {
          onNodesChange(changes);
          dispatch(updateNodes(changes));
          sessionStorage.setItem("workflowNodes", JSON.stringify(changes));
        }}
        onEdgesChange={(changes) => {
          onEdgesChange(changes);
          dispatch(updateEdges(changes));
        }}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>

      {selectedNode && (
        <NodeConfigModal
          selectedNode={selectedNode}
          onClose={() => setSelectedNode(null)}
          setNodes={setNodes}
        />
      )}
    </div>
  );
};

export default WorkflowCanvas;
