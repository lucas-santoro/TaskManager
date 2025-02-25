import { useEffect, useState } from "react";
import { getTasks, Task } from "../api/taskService";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isCreating, setIsCreating] = useState(false);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Task List</h2>

            {isCreating ? (
                <TaskForm
                    onTaskUpdated={() => {
                        setIsCreating(false);
                        fetchTasks();
                    }}
                />
            ) : (
                <button onClick={() => setIsCreating(true)}>
                    Add new task
                </button>
            )}

            {tasks.length === 0 ? (
                <p>Nenhuma tarefa encontrada. Adicione uma nova!</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onTaskUpdated={fetchTasks}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
