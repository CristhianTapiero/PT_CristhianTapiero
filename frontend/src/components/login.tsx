import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context.tsx";
import { config } from "../api/config.ts";

const Login = () => {
    const [email, setEmail] = useState("");
    const [user_password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { setIsAuthenticated } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 

        try {
            const response = await fetch(`${config.apiBaseUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, user_password }),
            });

            if (response.ok) {
                setIsAuthenticated(true); 
                navigate("/dashboard"); 
            } else {
                const data = await response.json();
                setError(data.message || "Invalid login credentials");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={user_password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
