import { useEffect, useState } from "react";
import { getTasks, Task } from "../api/taskService";

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]); // 🔹 Agora TypeScript sabe que é um array de Tasks

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await getTasks();
            if (data) 
            {
                setTasks(data);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div>
            <h2>My Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.title}</li> // 🔹 Agora o TS reconhece "id" e "title"
                ))}
            </ul>
        </div>
    );
};

export default Home;
