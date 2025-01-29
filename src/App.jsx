import './App.css';
import { Route, Routes } from "react-router-dom";
import React, { lazy } from "react";

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
function App() {
  return (
    <div className="App bg-neutral-900">
      <Routes>
        <Route path="" exact element={<Home />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/login" exact element={<Login/>} />
        <Route path="/register" exact element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;