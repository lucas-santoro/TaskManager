import { TaskModel } from "../models/TaskModel";
import client from "../database";

/**
 * @brief Manages task operations.
 * @details Handles task creation, retrieval, updating, and deletion using PostgreSQL.
 */
class TaskManager 
{
    async getAllTasks(): Promise<TaskModel[]> 
    {
        const result = await client.query("SELECT * FROM tasks");
        return result.rows;
    }

    async getTaskById(id: number): Promise<TaskModel | null> 
    {
        const result = await client.query("SELECT * FROM tasks WHERE id = $1", [id]);
        return result.rows[0] || null;
    }

    async createTask(title: string, description: string, status: string): Promise<TaskModel> 
    {
        const result = await client.query(
            "INSERT INTO tasks (title, description, status, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
            [title, description, status]
        );
        return result.rows[0];
    }

    async updateTask(id: number, updatedFields: Partial<TaskModel>): Promise<TaskModel | null> 
    {
        const { title, description, status } = updatedFields;
        const result = await client.query(
            "UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *",
            [title, description, status, id]
        );
        return result.rows[0] || null;
    }

    async deleteTask(id: number): Promise<boolean> 
    {
        const result = await client.query("DELETE FROM tasks WHERE id = $1", [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }
}

export default new TaskManager();
