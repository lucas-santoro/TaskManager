import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

/**
 * @brief Defines authentication routes.
 * @details Provides endpoints for user registration and login.
 */

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", AuthController.logout);

export default router;
