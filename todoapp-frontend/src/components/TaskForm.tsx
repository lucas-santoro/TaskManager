import { useState } from "react";
import { createTask, updateTask, NewTask } from "../api/taskService";

/**
 * @brief Form component for creating and updating tasks.
 * @details Allows users to input task details and submit to the API.
 */
const TaskForm = ({ taskToEdit, onTaskUpdated }: { taskToEdit?: { id: number; title: string; description: string; status: string }, onTaskUpdated: () => void }) => 
{
    const [title, setTitle] = useState(taskToEdit?.title || "");
    const [description, setDescription] = useState(taskToEdit?.description || "");
    const [status, setStatus] = useState<"pending" | "in progress" | "concluded">(
        (taskToEdit?.status as "pending" | "in progress" | "concluded") || "pending"
    );

    /**
     * @brief Handles form submission for creating or updating a task.
     * @param event The form submission event.
     */
    const handleSubmit = async (event: React.FormEvent) => 
    {
        event.preventDefault();

        try 
        {
            if (taskToEdit) 
            {
                await updateTask(taskToEdit.id, { title, description, status });
            } 
            else 
            {
                const newTask: NewTask = { title, description, status };
                await createTask(newTask);
            }

            onTaskUpdated();
        } 
        catch (error) 
        {
            console.error("Error saving task:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{taskToEdit ? "Edit Task" : "Create Task"}</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            
            <select value={status} onChange={(e) => setStatus(e.target.value as "pending" | "in progress" | "concluded")}>
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="concluded">Concluded</option>
            </select>

            <button type="submit">{taskToEdit ? "Update" : "Create"}</button>
        </form>
    );
};

export default TaskForm;
