import './App.css';
import { Route, Routes } from "react-router-dom";
import React, { lazy } from "react";

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const RegisterOrg = lazy(() => import('./components/RegisterOrg'));
const LoginOrg = lazy(() => import('./components/LoginOrg'));
function App() {
  return (
    <div className="App bg-neutral-900">
      <Routes>
        <Route path="" exact element={<Home />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/login" exact element={<Login/>} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/register-org" exact element={<RegisterOrg />} />
        <Route path="/login-org" exact element={<LoginOrg />} />

      </Routes>
    </div>
  );
}

export default App;