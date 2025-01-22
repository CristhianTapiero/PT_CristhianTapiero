import React from "react";
import { useAuth } from "../auth/context.tsx";
import { useLocation } from "react-router-dom";
import { config } from "../api/config.ts";

const Header: React.FC = () => {
    const { setIsAuthenticated } = useAuth();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            const response = await fetch(`${config.apiBaseUrl}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (response.ok) {
                window.location.href = '/login';
                setIsAuthenticated(false);
            } else {
                throw new Error('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    }

    const isLoginPage = location.pathname === '/login';

    return (
        <nav className={`w-screen h-10 flex justify-between items-center bg-slate-500 px-7 ${isLoginPage ? 'hidden' : ''}`}>
            <a href="/dashboard">Inicio</a>
            <ul className="flex justify-center items-center border-slate-400 h-full">
                <li className={`px-5 border-l-2 border-r-2 h-full flex justify-center items-center`}>
                    <a href="/create-enrollment">Matricular usuarios</a>
                </li>
                <li className={`px-5 border-r-2 h-full flex justify-center items-center`}>
                    <button className="size-full" onClick={() => handleLogout()}>Cerrar sesión</button>
                </li>
            </ul>
        </nav>
    );
}

export default Header;