import api from "../api/apiClient";

/**
 * @brief Fetches all tasks from the API.
 * @return A promise resolving to an array of tasks.
 */
export const getTasks = async () => {
    const response = await api.get("/tasks");
    return response.data;
};

/**
 * @brief Creates a new task.
 * @param task The task object to be created.
 * @return A promise resolving to the created task.
 */
export const createTask = async (task: { title: string; description: string; status: string }) => {
    const response = await api.post("/tasks", task);
    return response.data;
};

/**
 * @brief Updates an existing task.
 * @param id The ID of the task to update.
 * @param updates The fields to update.
 * @return A promise resolving to the updated task.
 */
export const updateTask = async (id: number, updates: Partial<{ title: string; description: string; status: string }>) => {
    const response = await api.put(`/tasks/${id}`, updates);
    return response.data;
};

/**
 * @brief Deletes a task by ID.
 * @param id The ID of the task to delete.
 * @return A promise resolving to void.
 */
export const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
};
