import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/nav/Navbar';
import HomePage from './pages/homepage/HomePage';
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import WebProject from './pages/webProject/WebProject'
import ScriptProject from './pages/scriptProject/scriptProject'

function App() {
  return (
      <>
      <Router>
        <div className='main-container'>
          <Routes>
              <Route path="/" element={ <HomePage /> } />
              <Route path="/login" element={ <Login /> } />
              <Route path="/register" element={ <Register /> } />
              <Route path="/webProject" element={ <WebProject />} />
              <Route path="/scriptProject" element={ <ScriptProject /> } />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
