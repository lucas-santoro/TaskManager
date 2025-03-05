import { useEffect, useState } from "react";
import { getTasks, createTask, Task } from "../api/taskService";
import TaskList from "../components/TaskList";

import "./styles/Tasks.css";

/**
 * @brief Tasks page displaying the task list and management.
 */
const Tasks = () => 
{
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<"pending" | "in progress" | "concluded">("pending");
    const [priority, setPriority] = useState("");

    /**
     * @brief Fetches the task list from the API.
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
     * @brief Handles task creation and updates the list.
     * @param event The form submission event.
     */
    const handleCreateTask = async (event: React.FormEvent) => 
    {
        event.preventDefault();
    
        if (!title.trim() || !priority.trim()) 
        {
            return;
        }
    
        const newTask = 
        {
            title,
            description,
            status,
            priority: parseInt(priority),
        };
    
        try 
        {
            await createTask(newTask);
            setTitle("");
            setDescription("");
            setPriority("");
            setStatus("pending");
            fetchTasks();
        } 
        catch (error) 
        {
            console.error("Error creating task:", error);
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
        <div className="tasks-container">
            <h1 className="tasks-title">Task Manager</h1>
            <h2 className="tasks-subtitle">Manage your daily tasks efficiently</h2>

            {/* Task creation form */}
            <div className="create-task-container">
                <form className="create-task-form" onSubmit={handleCreateTask}>
                    <input 
                        type="text" 
                        placeholder="Title" 
                        className="create-task-input" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={20}
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Description" 
                        className="create-task-input" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={140}
                    />
                    <select 
                        className="create-task-select" 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value as "pending" | "in progress" | "concluded")}
                    >
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="concluded">Completed</option>
                    </select>
                    <input 
                        type="number" 
                        placeholder="Priority" 
                        className="create-task-input priority" 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value ? parseInt(e.target.value).toString() : "")}
                        required 
                    />
                    <button type="submit" className="create-task-button">Create</button>
                </form>
            </div>

            {/* Task list */}
            <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
        </div>
    );
};

export default Tasks;
