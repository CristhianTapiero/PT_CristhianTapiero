import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../src/pages/Login.tsx";
import Dashboard from "../src/pages/Dashboard.tsx";
import ProtectedRoute from "./components/authValidator.tsx";
import { EditUser } from "./pages/EditUser.tsx";
import CreateUser from "./pages/CreateUser.tsx";
import { AuthProvider } from "./auth/context.tsx";
import Header from "./components/header.tsx";
import { EditCourse } from "./pages/EditCourse.tsx";
import CreateCourse from "./pages/CreateCourse.tsx";
import CreateEnroll from "./pages/CreateEnroll.tsx";

const App:React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
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
                            <EditUser />
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/edit-course/:id" element={
                        <ProtectedRoute>
                            <EditCourse />
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/create-user" element={
                        <ProtectedRoute>
                            <CreateUser />
                        </ProtectedRoute>} />
                    <Route path="/create-course" element={
                        <ProtectedRoute>
                            <CreateCourse />
                        </ProtectedRoute>} />
                    <Route path="/create-enrollment" element={
                        <ProtectedRoute>
                            <CreateEnroll />
                        </ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
