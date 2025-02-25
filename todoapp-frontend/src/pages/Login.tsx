import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient";

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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email or Nickname"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
