import { useEffect, useState } from "react";
import { getTasks, Task } from "../api/taskService";
import TaskItem from "./TaskItem";

/**
 * @brief Task list component displaying all tasks.
 * @details Fetches tasks from the API and updates dynamically.
 */
const TaskList = () => 
{
    const [tasks, setTasks] = useState<Task[]>([]);

    /**
     * @brief Fetches the task list from the API.
     * @details Updates the state with the retrieved tasks.
     */
    const fetchTasks = async () => 
    {
        try 
        {
            const data = await getTasks();
            setTasks(Array.isArray(data) ? data : []);
        } 
        catch (error) 
        {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        }
    };

    /**
     * @brief Loads tasks when the component is mounted.
     */
    useEffect(() => 
    {
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Task List</h2>

            {tasks.length === 0 ? (
                <p>No tasks found. Add a new one!</p>
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
