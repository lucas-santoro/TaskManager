import { useState } from "react";
import { createTask, updateTask, NewTask } from "../api/taskService";

interface TaskFormProps 
{
    taskToEdit?: { id: number; title: string; description: string; status: string; priority: number };
    onTaskUpdated: () => void;
}

const TaskForm = ({ taskToEdit, onTaskUpdated }: TaskFormProps) => 
{
    const [title, setTitle] = useState(taskToEdit?.title || "");
    const [description, setDescription] = useState(taskToEdit?.description || "");
    const [status, setStatus] = useState<"pending" | "in progress" | "concluded">(
        (taskToEdit?.status as "pending" | "in progress" | "concluded") || "pending"
    );
    const [priority, setPriority] = useState(taskToEdit?.priority || 1);

    const handleSubmit = async (event: React.FormEvent) => 
    {
        event.preventDefault();

        try 
        {
            if (taskToEdit) 
            {
                await updateTask(taskToEdit.id, { title, description, status, priority });
            } 
            else 
            {
                const newTask: NewTask = { title, description, status, priority };
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
        <form onSubmit={handleSubmit} className="create-task-form">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="create-task-input"
            />

            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="create-task-input"
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "pending" | "in progress" | "concluded")}
                className="create-task-select"
            >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="concluded">Concluded</option>
            </select>

            <input
                type="number"
                placeholder="Priority"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                required
                className="create-task-input priority"
            />

            <button type="submit" className="create-task-button">
                {taskToEdit ? "Update" : "Create"}
            </button>
        </form>
    );
};

export default TaskForm;
