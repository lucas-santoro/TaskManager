import TaskList from "../components/TaskList";

import "./styles/Tasks.css";

/**
 * @brief Tasks page displaying the task list and management.
 */
const Tasks = () => 
{
    return (
        <div className="tasks-container">
            <h1 className="tasks-title">Task Manager</h1>
            <h2 className="tasks-subtitle">Manage your daily tasks efficiently</h2>
            <div className="create-task-container">
                <form className="create-task-form">
                    <input type="text" placeholder="Title" className="create-task-input" />
                    <input type="text" placeholder="Description" className="create-task-input" />
                    <select className="create-task-select">
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                    <input type="number" placeholder="Priority" className="create-task-input" />
                    <button type="submit" className="create-task-button">Create</button>
                </form>
            </div>
    
            <div className="task-list-container">
                <TaskList />
            </div>
        </div>
    );
};
    
export default Tasks;
