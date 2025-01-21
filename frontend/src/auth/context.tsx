import React, { createContext, useState, useEffect, useContext } from "react";
import { config } from "../api/config.ts";

const AuthContext = createContext<{
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
}>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    loading: true,
});

export const AuthProvider = ({ children }:{ children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${config.apiBaseUrl}/check-auth`, {
                    method: "GET",
                    credentials: "include", // Enviar cookies automáticamente
                });
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
