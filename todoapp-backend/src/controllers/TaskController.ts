import { Request, Response } from "express";
import TaskManager from "../services/TaskManager";

/**
 * @brief Handles HTTP requests related to tasks.
 * @details Processes requests and interacts with TaskManager to perform operations.
 */
class TaskController 
{
    async getAllTasks(req: Request, res: Response) 
    {
        const tasks = await TaskManager.getAllTasks();
        res.json(tasks);
    }

    getTaskById(req: Request, res: Response): void 
    {
        const task = TaskManager.getTaskById(Number(req.params.id));
        if (!task) 
        {
            res.status(404).json({ message: "Task not found" });
            return;
        }

        res.json(task);
    }

    createTask(req: Request, res: Response): void 
    {
        const { title, description, status } = req.body;
        const task = TaskManager.createTask(title, description, status);
        res.status(201).json(task);
    }

    updateTask(req: Request, res: Response): void 
    {
        const updatedTask = TaskManager.updateTask(Number(req.params.id), req.body);
        if (!updatedTask) 
        {
            res.status(404).json({ message: "Task not found" });
            return;
        }

        res.json(updatedTask);
    }

    deleteTask(req: Request, res: Response): void 
    {
        const success = TaskManager.deleteTask(Number(req.params.id));
        if (!success) 
        {
            res.status(404).json({ message: "Task not found" });
            return;
        }

        res.status(204).send();
    }
}

export default new TaskController();
