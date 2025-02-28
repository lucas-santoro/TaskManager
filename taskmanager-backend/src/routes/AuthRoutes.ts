import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

/**
 * @brief Defines authentication routes.
 * @details Provides endpoints for user registration and login.
 */

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
