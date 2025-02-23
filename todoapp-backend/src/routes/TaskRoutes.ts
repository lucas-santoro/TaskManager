import { Router } from "express";
import TaskController from "../controllers/TaskController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();

/**
 * @brief Defines task-related routes.
 * @details These routes are protected and require authentication.
 */
router.get("/", AuthMiddleware, async (req, res) => { await TaskController.getAllTasks(req, res); });
router.get("/:id", AuthMiddleware, async (req, res) => { await TaskController.getTaskById(req, res); });
router.post("/", AuthMiddleware, async (req, res) => { await TaskController.createTask(req, res); });
router.put("/:id", AuthMiddleware, async (req, res) => { await TaskController.updateTask(req, res); });
router.delete("/:id", AuthMiddleware, async (req, res) => { await TaskController.deleteTask(req, res); });

export default router;
