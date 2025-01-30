import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import React, { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="App bg-neutral-900">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <Routes>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
