/**
 * @brief Represents a task entity.
 * @details Defines the structure of a task stored in the database.
 */
export interface TaskModel 
{
    id: number;
    title: string;
    description: string;
    status: "pending" | "in progress" | "completed";
    createdAt: Date;
    userId: number;
    priority: number;
}
