import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TaskDetails from './components/TaskDetails';
import Auth from './components/Auth';
import TaskProvider from './components/context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
