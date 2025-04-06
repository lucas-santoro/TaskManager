import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import AuthManager from "../services/AuthManager";

/**
 * @brief Handles authentication-related requests.
 * @details Provides user registration, login, and token refresh functionalities.
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

        const tokens = await AuthManager.login(identifier, password);

        if (!tokens) 
        {
            res.status(401).json({ message: "Invalid credentials." });
            return;
        }

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
        });

        res.json({ accessToken: tokens.accessToken });
    }

    /**
     * @brief Refreshes the access token using a valid refresh token.
     * @details Validates the refresh token and generates a new access token.
     */
    async refreshToken(req: Request, res: Response): Promise<void> 
    {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) 
        {
            res.status(401).json({ message: "Refresh token is required." });
            return;
        }

        try 
        {
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as { id: number };

            const newAccessToken = jwt.sign(
                { id: decoded.id },
                process.env.JWT_SECRET as string,
                { expiresIn: "1h" }
            );

            res.json({ accessToken: newAccessToken });
        } 
        catch (error) 
        {
            res.status(401).json({ message: "Invalid or expired refresh token." });
        }
    }

    /**
     * @brief Logs out the user by clearing the refresh token cookie.
     */
    async logout(req: Request, res: Response): Promise<void> 
    {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.json({ message: "Logged out successfully." });
    }
}

export default new AuthController();
