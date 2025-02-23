import { useState } from "react";
import { deleteTask } from "../api/taskService";
import TaskForm from "./TaskForm";

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: number;
}

interface TaskItemProps {
    task: Task;
    onTaskUpdated: () => void;
}

const TaskItem = ({ task, onTaskUpdated }: TaskItemProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteTask(task.id);
            onTaskUpdated();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div>
            {isEditing ? (
                <TaskForm
                    taskToEdit={task}
                    onTaskUpdated={() => {
                        setIsEditing(false);
                        onTaskUpdated();
                    }}
                />
            ) : (
                <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <p><strong>Priority:</strong> {task.priority}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
