import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/context.tsx";

const ProtectedRoute = ({ children }: { children : React.ReactNode}) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
