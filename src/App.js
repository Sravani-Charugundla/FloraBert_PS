import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Authenticate/Login';

const App = () => {
  return (
    <div>
      <Router>
          <Routes>

          </Routes>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
      </Router>
      
      
      {/* Your other components and content go here */}
      
     
    </div>
  );
};

export default App;
