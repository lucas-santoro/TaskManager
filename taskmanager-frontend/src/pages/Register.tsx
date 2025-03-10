import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient";
import "./styles/Register.css";

const Register = () => 
{
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => 
    {
        event.preventDefault();
        setError("");

        if (password !== confirmPassword) 
        {
            setError("Passwords do not match.");
            return;
        }

        try 
        {
            await api.post("/api/auth/register", { name, nickname, email, password });
            navigate("/login");
        } 
        catch (error) 
        {
            setError("Registration failed. Try again.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <div className="register-logo"></div>
                <h2 className="register-title">Register</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-container">
                        <label className="input-label">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>

                    <div className="input-container">
                        <label className="input-label">Nickname</label>
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>

                    <div className="input-container">
                        <label className="input-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>

                    <div className="input-container">
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>

                    <div className="input-container">
                        <label className="input-label">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>

                    <div className="button-container">
                        <button type="submit" className="register-button">Register</button>
                    </div>
                </form>
                {error && <p className="register-error">{error}</p>}
            </div>
        </div>
    );
};

export default Register;
