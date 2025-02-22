import { useState } from "react";
import { deleteTask } from "../api/taskService";
import TaskForm from "./TaskForm";

/**
 * @brief Displays a single task item.
 * @details Allows users to edit or delete a task.
 */
const TaskItem = ({ task, onTaskUpdated }: { task: { id: number; title: string; description: string; status: string }, onTaskUpdated: () => void }) => {
    const [isEditing, setIsEditing] = useState(false);

    /**
     * @brief Handles task deletion.
     */
    const handleDelete = async () => {
        try 
        {
            await deleteTask(task.id);
            onTaskUpdated();
        } 
        catch (error) 
        {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div>
            {isEditing ? (
                <TaskForm taskToEdit={task} onTaskUpdated={() => { setIsEditing(false); onTaskUpdated(); }} />
            ) : (
                <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
