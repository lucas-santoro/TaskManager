import { Router } from "express";
import TaskController from "../controllers/TaskController";
import authMiddleware from "../middleware/AuthMiddleware";

const router = Router();

/**
 * @brief Defines task-related routes.
 * @details These routes are protected and require authentication.
 */
router.get("/", authMiddleware, TaskController.getAllTasks);
router.get("/:id", authMiddleware, TaskController.getTaskById);
router.post("/", authMiddleware, TaskController.createTask);
router.put("/:id", authMiddleware, TaskController.updateTask);
router.delete("/:id", authMiddleware, TaskController.deleteTask);

export default router;
