import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel";
import client from "../database/database";

/**
 * @brief Manages authentication logic.
 * @details Handles user registration, login, and token generation.
 */
class AuthManager 
{
    async register(name: string, nickname: string, email: string, password: string): Promise<Omit<UserModel, "password"> | null> 
    {
        const hashedPassword = await bcrypt.hash(password, 10);
    
        try 
        {
            const result = await client.query(
                "INSERT INTO users (name, nickname, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, nickname, email, created_at",
                [name, nickname, email, hashedPassword]
            );
    
            return result.rows[0];
        } 
        catch (error) 
        {
            console.error("Error registering user:", error);
            return null;
        }
    }    

    async login(identifier: string, password: string): Promise<{ accessToken: string, refreshToken: string } | null>
    {
        const result = await client.query(
            "SELECT * FROM users WHERE email = $1 OR nickname = $1",
            [identifier]
        );

        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) 
        {
            return null;
        }

        const accessToken  = jwt.sign(
            { id: user.id, identifier: user.nickname || user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        return { accessToken, refreshToken };
    }
}

export default new AuthManager();
