import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  nodes: [],
  edges: [],
  history: [],
  future: [],
  nodesData: {}, // Store node-specific data
};

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    addNode: (state, action) => {
      const { type, position } = action.payload;
      const newNode = {
        id: nanoid(),
        type,
        position,
        data: { label: type.charAt(0).toUpperCase() + type.slice(1) },
      };
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
      state.nodes.push(newNode);
      state.nodesData[newNode.id] = newNode.data; // Store default node data
    },
    addEdge: (state, action) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
      state.edges.push(action.payload);
    },
    updateNodes: (state, action) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
      state.nodes = state.nodes.map((node) =>
        node.id === action.payload.id ? { ...node, ...action.payload } : node
      );
    },
    updateEdges: (state, action) => {
        state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
        state.future = [];
        state.nodes = state.nodes.map((node) =>
          node.id === action.payload.id ? { ...node, ...action.payload } : node
        );
      },
    saveNodeData: (state, action) => {
      const { nodeId, data } = action.payload;
      state.nodesData[nodeId] = data;
      state.nodes = state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data } : node
      );
    },
    updateNodeData: (state, action) => {
        const { nodeId, data } = action.payload;
        state.nodesData[nodeId] = data;
        state.nodes = state.nodes.map((node) =>
          node.id === nodeId ? { ...node, data } : node
        );
    },
    
    deleteNode: (state, action) => {
        const nodeId = action.payload;
        state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
        state.future = [];
        
        
        state.nodes = state.nodes.filter((node) => node.id !== nodeId);
      
        
        state.edges = state.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
      
        
        delete state.nodesData[nodeId];
      },
      
    deleteSelected: (state) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
      state.nodes = state.nodes.filter((node) => !node.selected);
      state.edges = state.edges.filter((edge) => !edge.selected);
    },
    undo: (state) => {
      if (state.history.length > 0) {
        const previousState = state.history.pop();
        state.future.push({ nodes: [...state.nodes], edges: [...state.edges] });
        state.nodes = previousState.nodes;
        state.edges = previousState.edges;
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextState = state.future.pop();
        state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
        state.nodes = nextState.nodes;
        state.edges = nextState.edges;
      }
    },
  },
});

export const { addNode, addEdge, deleteSelected,deleteNode,updateNodeData, undo, redo, updateNodes, saveNodeData,updateEdges } = workflowSlice.actions;
export default workflowSlice.reducer;
