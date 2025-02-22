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
        const { name, email, password } = req.body;

        if (!name || !email || !password) 
        {
            res.status(400).json({ message: "All fields are required." });
            return;
        }

        const user = await AuthManager.register(name, email, password);

        if (!user) 
        {
            res.status(400).json({ message: "Failed to register user. Email might already be in use." });
            return;
        }

        res.status(201).json(user);
    }

    async login(req: Request, res: Response): Promise<void> 
    {
        const { email, password } = req.body;

        if (!email || !password) 
        {
            res.status(400).json({ message: "Email and password are required." });
            return;
        }

        const token = await AuthManager.login(email, password);

        if (!token) 
        {
            res.status(401).json({ message: "Invalid credentials." });
            return;
        }

        res.json({ token });
    }
}

export default new AuthController();
