import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../src/pages/Login.tsx";
import Dashboard from "../src/pages/Dashboard.tsx";
import ProtectedRoute from "./components/authValidator.tsx";
import { EditUser } from "./pages/EditUser.tsx";
import CreateUser from "./pages/CreateUser.tsx";
import { AuthProvider } from "./auth/context.tsx";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/edit-user/:id" element={
                        <ProtectedRoute>
                            <EditUser/>
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/create-user" element={
                        <ProtectedRoute>
                            <CreateUser/>
                        </ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
