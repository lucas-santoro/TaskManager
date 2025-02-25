/**
 * @brief Represents a user entity.
 * @details Defines the structure of a user stored in the database.
 */
export interface UserModel 
{
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}
