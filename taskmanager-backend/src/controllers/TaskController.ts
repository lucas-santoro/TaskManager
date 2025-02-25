import { Response } from "express";
import TaskManager from "../services/TaskManager";
import { AuthRequest } from "../middleware/AuthMiddleware";

/**
 * @brief Handles HTTP requests related to tasks.
 * @details Processes requests and interacts with TaskManager to perform operations.
 */
class TaskController 
{
    async getAllTasks(req: AuthRequest, res: Response) 
    {
        if (!req.user) 
        {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const tasks = await TaskManager.getAllTasks(req.user.id);
        res.json(tasks);
    }

    async getTaskById(req: AuthRequest, res: Response) 
    {
        if (!req.user) 
        {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const task = await TaskManager.getTaskById(Number(req.params.id), req.user.id);
        if (!task) 
        {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    }

    async createTask(req: AuthRequest, res: Response) 
    {
        if (!req.user) 
        {
            return res.status(401).json({ message: "Unauthorized" });
        }
    
        const { title, description, status, priority } = req.body;
    
        if (!title || !description || priority === undefined) 
        {
            return res.status(400).json({ message: "Missing required fields" });
        }
    
        const task = await TaskManager.createTask(
            title, 
            description, 
            status, 
            req.user.id,
            priority
        );
        
        res.status(201).json(task);
    }
    
    async updateTask(req: AuthRequest, res: Response) 
    {
        if (!req.user) 
        {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const updatedTask = await TaskManager.updateTask(Number(req.params.id), req.body, req.user.id);
        if (!updatedTask) 
        {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        res.json(updatedTask);
    }

    async deleteTask(req: AuthRequest, res: Response) 
    {
        if (!req.user) 
        {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const success = await TaskManager.deleteTask(Number(req.params.id), req.user.id);
        if (!success) 
        {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        res.status(204).send();
    }
}

export default new TaskController();
