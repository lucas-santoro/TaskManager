import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, Task } from "../api/taskService";

/**
 * @brief Displays a list of tasks.
 * @details Fetches tasks from the API, allows adding and deleting tasks.
 */
const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<"pending" | "in progress" | "concluded">("pending");

    /**
     * @brief Fetches tasks from the API and updates state.
     */
    const fetchTasks = async () => {
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
     * @brief Handles adding a new task.
     */
    const handleAddTask = async () => {
        if (!title || !description) return alert("Preencha todos os campos!");
    
        try 
        {
            await createTask({ title, description, status });
            await fetchTasks();
            setTitle("");
            setDescription("");
            setStatus("pending");
        } 
        catch (error) 
        {
            console.error("Error adding task:", error);
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
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
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

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Título da tarefa"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descrição da tarefa"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select value={status} onChange={(e) => setStatus(e.target.value as "pending" | "in progress" | "concluded")}>
                    <option value="pending">Pendente</option>
                    <option value="in progress">Em progresso</option>
                    <option value="concluded">Concluída</option>
                </select>
                <button onClick={handleAddTask}>➕ Adicionar</button>
            </div>

            {tasks.length === 0 ? (
                <p>Nenhuma tarefa encontrada. Adicione uma nova!</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <strong>{task.title}</strong> - {task.status}
                            <button onClick={() => handleDelete(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
