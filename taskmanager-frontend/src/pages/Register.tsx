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
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => 
    {
        event.preventDefault();
        setError("");

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
                <h2 className="register-title">Register</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder=" "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="register-input"
                        />
                        <label className="input-label">Full Name</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            placeholder=" "
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            required
                            className="register-input"
                        />
                        <label className="input-label">Nickname</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="email"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="register-input"
                        />
                        <label className="input-label">Email</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="password"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="register-input"
                        />
                        <label className="input-label">Password</label>
                    </div>

                    <button type="submit" className="register-button">Register</button>
                </form>
                {error && <p className="register-error">{error}</p>}
            </div>
        </div>
    );
};

export default Register;
