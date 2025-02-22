import { Request, Response } from "express";
import AuthManager from "../services/AuthManager";

/**
 * @brief Handles authentication-related requests.
 * @details Provides user registration and login functionalities.
 */
class AuthController 
{
    async register(req: Request, res: Response): Promise<void> 
    {
        const { name, nickname, email, password } = req.body;
    
        if (!name || !nickname || !email || !password) 
        {
            res.status(400).json({ message: "All fields are required." });
            return;
        }
    
        const user = await AuthManager.register(name, nickname, email, password);
    
        if (!user) 
        {
            res.status(400).json({ message: "Failed to register user. Email or nickname might already be in use." });
            return;
        }
    
        res.status(201).json(user);
    }
    

    async login(req: Request, res: Response): Promise<void> 
    {
        const { identifier, password } = req.body;

        if (!identifier || !password) 
        {
            res.status(400).json({ message: "Email and password are required." });
            return;
        }

        const token = await AuthManager.login(identifier, password);

        if (!token) 
        {
            res.status(401).json({ message: "Invalid credentials." });
            return;
        }

        res.json({ token });
    }
}

export default new AuthController();
