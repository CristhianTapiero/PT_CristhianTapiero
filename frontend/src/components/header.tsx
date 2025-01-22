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
        <nav className={`w-screen h-16 flex justify-between items-center bg-white border-b-2 px-7 ${isLoginPage ? 'hidden' : ''}`}>
            <img src="./logo.png" alt="Logo Course Manager" className="size-16 cursor-pointer" onClick={() => window.location.href = '/dashboard'}/>
            <ul className="flex justify-center gap-x-2 items-center border-slate-400 h-4/6">
            <li className={`px-5 border-l-2 h-full flex justify-center items-center bg-indigo-700 hover:bg-indigo-500 transition-colors text-white`}>
                <a href="/create-enrollment">Matricular usuarios</a>
            </li>
            <li className={`px-5 border-l-2 h-full flex justify-center items-center bg-red-700 hover:bg-red-900 text-white transition-colors`}>
                <button className="size-full" onClick={() => handleLogout()}>Cerrar sesión</button>
            </li>
            </ul>
        </nav>
    );
}

export default Header;