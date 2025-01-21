import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context.tsx";

const LogoutButton = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:3001/logout", {
                method: "POST",
                credentials: "include", // Incluir cookies en la solicitud
            });

            if (response.ok) {
                setIsAuthenticated(false); // Actualizar el estado de autenticación
                navigate("/login"); // Redirigir al inicio de sesión
            } else {
                console.error("Failed to log out");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return <button className="button-disruptive" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
