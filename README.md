Workflow Automation Builder

Overview

This project is a Workflow Automation Builder that allows users to create, visualize, and manage workflows using React Flow, React Hook Form, and React Table. Users can drag-and-drop nodes, configure their properties, and manage workflows efficiently.


Features

Core Features

Workflow Canvas: Interactive drag-and-drop interface using React Flow.

Node Configuration: Click on nodes to configure their properties using React Hook Form.

Workflow Data Table: Displays all nodes in a structured table with inline editing using React Table.

CRUD Operations: Add, edit, and delete nodes and edges.

Advanced Features

Validation: Required fields and data validation in forms.

Undo/Redo: Track changes and revert actions.

Export/Import: Save workflows as JSON and load them back into the app.

Performance Optimizations: Memoization, efficient state management, and handling of large workflows.



Project Structure

workflow-builder/
├── src/
│   ├── components/  # Reusable UI components
│   ├── hooks/        # Custom hooks for state management
│   ├── pages/        # Main pages like WorkflowCanvas
│   ├── store/        # Redux store and slices
│   ├── utils/        # Helper functions
│   ├── App.tsx       # Main App component
│   ├── index.tsx     # Entry point
│
├── public/           # Static assets
├── package.json      # Dependencies and scripts
├── README.md         # Project documentation

Installation & Setup

Prerequisites

Node.js >= 16

npm or yarn

Steps to Run Locally

Clone the repository:

git clone https://github.com/JeetYad07/Workflow_builder_automation.git
cd workflow-builder

Install dependencies:

npm install

Start the development server:

npm run dev

Open http://localhost:5173 in your browser.

Usage

Drag and drop nodes onto the canvas.

Click on a node to edit its properties.

Connect nodes with edges.

View and edit nodes in the data table.

Export and import workflows.

Design Decisions & Trade-offs

Redux for state management: Chosen over Zustand for better debugging and middleware support.

Vite for build speed: Faster hot-reloading compared to Create React App.

Tailwind CSS for styling: Eliminates the need for separate stylesheets.

React Flow for canvas interactions: Provides built-in support for drag-and-drop and edge connections.

Assumptions

Each workflow must have at least one node.

Nodes are uniquely identified by an auto-incrementing ID.

Workflow data is stored in-memory (not persisted in a database).

Future Improvements

Database Integration: Store workflows in a backend database.

Collaboration Features: Implement WebSocket-based real-time updates.

Advanced Node Types: Support more node types with custom behaviors.