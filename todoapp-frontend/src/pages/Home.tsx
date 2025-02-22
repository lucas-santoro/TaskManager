import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

/**
 * @brief Main page displaying tasks.
 * @details Combines TaskList and TaskForm for task management.
 */
const Home = () => {
    const [taskUpdated, setTaskUpdated] = useState(false);

    /**
     * @brief Triggers a re-fetch of tasks when an update occurs.
     */
    const handleTaskUpdate = () => {
        setTaskUpdated(prev => !prev);
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <TaskForm onTaskUpdated={handleTaskUpdate} />
            <TaskList key={taskUpdated.toString()} />
        </div>
    );
};

export default Home;
