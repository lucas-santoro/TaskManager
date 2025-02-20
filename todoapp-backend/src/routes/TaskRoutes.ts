import { Router } from "express";
import TaskController from "../controllers/TaskController";

const router = Router();

/**
 * @brief Defines the task-related API routes.
 * @details Each route is mapped to a method in TaskController.
 */
router.get("/", TaskController.getAllTasks);
router.get("/:id", TaskController.getTaskById);
router.post("/", TaskController.createTask);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

export default router;
