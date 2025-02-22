import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../api/taskService";

/**
 * @brief Displays a list of tasks.
 * @details Fetches tasks from the API and allows deletion.
 */
const TaskList = () => {
    const [tasks, setTasks] = useState<{ id: number; title: string; description: string; status: string }[]>([]);

    /**
     * @brief Fetches tasks from the API and updates state.
     */
    const fetchTasks = async () => {
        try 
        {
            const data = await getTasks();
            setTasks(data);
        } 
        catch (error) 
        {
            console.error("Error fetching tasks:", error);
        }
    };

    /**
     * @brief Deletes a task and updates the list.
     * @param id The ID of the task to delete.
     */
    const handleDelete = async (id: number) => {
        try 
        {
            await deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        } 
        catch (error) 
        {
            console.error("Error deleting task:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <strong>{task.title}</strong> - {task.status}
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
