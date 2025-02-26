import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/apiClient";
import "./styles/Login.css";

/**
 * @brief Login page for user authentication.
 * @details Allows users to log in using email or nickname.
 */
const Login = () => 
{
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    /**
     * @brief Handles the login form submission.
     * @param event The form submission event.
     */
    const handleSubmit = async (event: React.FormEvent) => 
    {
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
        <div className="container">
            <div className="login-box">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="logo"></div>
                    <span className="header">Welcome Back!</span>

                    <input 
                        type="text" 
                        placeholder="Email or Nickname" 
                        className="input" 
                        value={identifier} 
                        onChange={(e) => setIdentifier(e.target.value)}
                        required 
                    />

                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="input" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />

                    <button type="submit" className="button sign-in">Sign In</button>

                    {error && <p className="login-error">{error}</p>}

                    <p className="footer">
                        Don't have an account?{" "}
                        <Link to="/register" className="link">Sign up, it's free!</Link>
                        <br />
                        <Link to="/forgot-password" className="link">Forgot password?</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
