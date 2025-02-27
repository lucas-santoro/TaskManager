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
                    {/* Título e Descrição (lado esquerdo) */}
                    <div className="task-info">
                        <h3 className="task-title">{task.title}</h3>
                        <p className="task-description">{task.description}</p>
                    </div>

                    {/* Status e Prioridade (centro) */}
                    <div className="task-status-priority">
                        <p className="task-status"><strong>Status:</strong> {task.status}</p>
                        <p className="task-priority"><strong>Priority:</strong> {task.priority}</p>
                    </div>

                    {/* Botões (lado direito) */}
                    <div className="task-buttons">
                        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="delete-button" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
