import { useEffect, useState } from "react";
import { getTasks, Task } from "../api/taskService";

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
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
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
