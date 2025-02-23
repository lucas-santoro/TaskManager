import api from "../api/apiClient";

export interface Task 
{
    id: number;
    title: string;
    description: string;
    status: string;
    created_at: string;
    priority: number;
}

export type NewTask = {
    title: string;
    description: string;
    status: "pending" | "in progress" | "concluded";
    priority: number;
};

/**
 * @brief Fetches all tasks for the authenticated user.
 * @return A promise resolving to the list of tasks.
 */
export const getTasks = async (): Promise<Task[] | null> => 
{
    try 
    {
        const response = await api.get("/api/tasks");
        return response.data;
    } 
    catch (error) 
    {
        console.error("Error fetching tasks:", error);
        return null;
    }
};

/**
 * @brief Creates a new task.
 * @param taskData The task object to be created.
 * @return A promise resolving to the created task.
 */
export const createTask = async (taskData: NewTask) => 
{
    try 
    {
        const token = localStorage.getItem("token");
        const response = await api.post("/api/tasks", taskData, {
            headers: { Authorization: `Bearer ${token}` }, 
        });
        return response.data;
    } 
    catch (error) 
    {
        console.error("Error adding task:", error);
        return null;
    }
};

/**
 * @brief Updates an existing task.
 * @param id The ID of the task to update.
 * @param updates The fields to update.
 * @return A promise resolving to the updated task.
 */
export const updateTask = async (
    id: number, 
    updates: Partial<{
        title: string; 
        description: string; 
        status: "pending" | "in progress" | "concluded"; 
        priority: number;
    }>
) => {
    try {
        const token = localStorage.getItem("token");
        const response = await api.put(`/api/tasks/${id}`, updates, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        return null;
    }
};


/**
 * @brief Deletes a task by ID.
 * @param id The ID of the task to delete.
 * @return A promise resolving to void.
 */
export const deleteTask = async (id: number) => 
{
    try 
    {
        const token = localStorage.getItem("token");
        await api.delete(`/api/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } 
    catch (error) 
    {
        console.error("Error deleting task:", error);
    }
};
