import { Task } from "../api/taskService";
import TaskItem from "./TaskItem";

/**
 * @brief Task list component displaying all tasks.
 * @details Receives tasks as props and displays them in order of priority.
 */
const TaskList = ({ tasks, onTaskUpdated }: { tasks: Task[], onTaskUpdated: () => void }) => 
{
    const sortedTasks = [...tasks].sort((a, b) => { return b.priority - a.priority;});

    return (
        <div>
            <h2>Task List</h2>

            {sortedTasks.length === 0 ? (
                <p>No tasks found. Add a new one!</p>
            ) : (
                <ul>
                    {sortedTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onTaskUpdated={onTaskUpdated}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
