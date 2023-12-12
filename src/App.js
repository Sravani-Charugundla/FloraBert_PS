import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Authenticate/Login';
import Signup from './Authenticate/Signup';
import Home from './Components/Home';
import HomeNav from './Components/Navbar/Hnav';
import ForgotPassword from './Authenticate/ForgotPassword';
const App = () => {
  return (
    <div>
      <Router>
          <Routes>
            <Route path = "/Home" element = {<HomeNav/>}/>
           
          </Routes>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup/>} />
            <Route path="/Home" element={<Home/>}/>
            <Route path="/ForgotPassword" element = {<ForgotPassword/>}/>
          </Routes>
      </Router>
      
      
      {/* Your other components and content go here */}
      
     
    </div>
  );
};

export default App;
