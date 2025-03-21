import { useState } from "react";
import { deleteTask } from "../api/taskService";
import TaskForm from "./TaskForm";

interface Task 
{
    id: number;
    title: string;
    description: string;
    status: string;
    priority: number;
}

interface TaskItemProps 
{
    task: Task;
    onTaskUpdated: () => void;
}

const TaskItem = ({ task, onTaskUpdated }: TaskItemProps) => 
{
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async () => 
    {
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
        <div className="task-card">
            {isEditing ? (
                <TaskForm
                    taskToEdit={task}
                    onTaskUpdated={() => {
                        setIsEditing(false);
                        onTaskUpdated();
                    }}
                />
            ) : (
                <div className="task-content">
                    <div className="task-info">
                        <h3 className="task-title">{task.title}</h3>
                        <p className="task-description">{task.description}</p>
                    </div>

                    <div className="task-status-priority">
                        <p className="task-status"><strong>Status:</strong> {task.status}</p>
                        <p className="task-priority"><strong>Priority:</strong> {task.priority}</p>
                    </div>

                    <div className="task-buttons">
                        <button className="edit-button" onClick={() => setIsEditing(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="25" width="25">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.5 20.5 7.5M4 20h4l11-11-4-4L4 16v4z"/>
</svg>

                        </button>

                        <button className="delete-button" onClick={handleDelete}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="25" width="25" stroke="white" fill="none" strokeWidth="2">
        <path d="M3 6h18M8 6v12m8-12v12M5 6h14l-1 14H6L5 6zm5 0V4h4v2" />
    </svg>
</button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
