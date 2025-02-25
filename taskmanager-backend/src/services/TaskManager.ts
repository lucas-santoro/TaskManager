import client from "../database/database";

/**
 * @brief Manages task operations.
 * @details Handles task creation, retrieval, updating, and deletion using PostgreSQL.
 */
class TaskManager 
{
    async getAllTasks(userId: number) 
    {
        const result = await client.query(
            "SELECT * FROM tasks WHERE user_id = $1 ORDER BY priority ASC, created_at DESC",
            [userId]
        );
        return result.rows ?? [];
    }

    async getTaskById(id: number, userId: number) 
    {
        const result = await client.query(
            "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
            [id, userId]
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    async createTask(
        title: string, 
        description: string, 
        status: string, 
        userId: number, 
        priority: number
    ) 
    {
        const result = await client.query(
            "INSERT INTO tasks (title, description, status, created_at, user_id, priority) VALUES ($1, $2, $3, NOW(), $4, $5) RETURNING *",
            [title, description, status, userId, priority]
        );
        return result.rows[0];
    }

    async updateTask(
        id: number, 
        updatedFields: { title?: string; description?: string; status?: string; priority?: number }, 
        userId: number
    ) 
    {
        const task = await this.getTaskById(id, userId);
        if (!task) return null;

        const {
            title = task.title,
            description = task.description,
            status = task.status,
            priority = task.priority
        } = updatedFields;

        const result = await client.query(
            "UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4 WHERE id = $5 AND user_id = $6 RETURNING *",
            [title, description, status, priority, id, userId]
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    async deleteTask(id: number, userId: number) 
    {
        const result = await client.query(
            "DELETE FROM tasks WHERE id = $1 AND user_id = $2",
            [id, userId]
        );
        return result.rowCount !== null && result.rowCount > 0;
    }
}

export default new TaskManager();
