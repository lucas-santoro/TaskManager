import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * @brief Extends Request to include user property.
 */
export interface AuthRequest extends Request 
{
    user?: { id: number };
}

/**
 * @brief Middleware to protect routes by verifying JWT.
 * @details Ensures that only authenticated users can access protected endpoints.
 */
const AuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => 
{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) 
    {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try 
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
        req.user = { id: decoded.id }; 
        next();
    } 
    catch (error) 
    {
        res.status(401).json({ message: "Invalid token" });
    }
};

export default AuthMiddleware;
