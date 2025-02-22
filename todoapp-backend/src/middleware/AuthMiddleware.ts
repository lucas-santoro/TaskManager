import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * @brief Middleware to protect routes by verifying JWT.
 * @details Ensures that only authenticated users can access protected endpoints.
 */
const authMiddleware = (req: Request, res: Response, next: NextFunction): void => 
{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) 
    {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
    }

    const token = authHeader.split(" ")[1];

    try 
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded;
        next();
    } 
    catch (error) 
    {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};

export default authMiddleware;
