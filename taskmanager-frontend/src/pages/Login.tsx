import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/apiClient";
import "./styles/Login.css";

/**
 * @brief Login page for user authentication.
 * @details Allows users to log in using email or nickname.
 */
const Login = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    /**
     * @brief Handles the login form submission.
     * @param event The form submission event.
     */
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");

        try 
        {
            const response = await api.post("/api/auth/login", { identifier, password });
            localStorage.setItem("token", response.data.token);
            navigate("/tasks");
        } 
        catch (error) 
        {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
    <div className="input-container">
        <input
            type="text"
            placeholder=" "
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="login-input"
        />
        <label className="input-label">Email or Nickname</label>
    </div>

    <div className="input-container">
        <input
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
        />
        <label className="input-label">Password</label>
    </div>

    <button type="submit" className="login-button">Login</button>
</form>

                {error && <p className="login-error">{error}</p>}
    
                <p className="login-text">
                    Don't have an account?{" "}
                    <Link to="/register" className="login-link">Register</Link>
                </p>
            </div>
        </div>
    );
    

};

export default Login;
