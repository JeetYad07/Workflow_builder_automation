// src/App.jsx
import React from "react";
import { Provider } from "react-redux";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import WorkflowPage from "./pages/WorkflowPage";
// import WorkflowCanvas from "./components/WorkflowCanvas";
import Sidebar from "./components/Sidebar";


const App = () => {
  return (
    <div style={{ display: "flex" }}>
    <Provider store={store}>
     <WorkflowPage />
      {/* <Router>
        <Routes>
          <Route path="/" element={<WorkflowPage />} />
        </Routes>
      </Router> */}
    </Provider>
    </div>
  );
};

export default App;
