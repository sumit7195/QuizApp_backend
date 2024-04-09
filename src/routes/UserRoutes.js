import express from "express";
import UserController from "../controllers/UserController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/quizzes/:id/submit", verifyToken, UserController.submitQuiz);
router.get(
  "/users/quiz-attempts",
  verifyToken,
  UserController.fetchUserQuizAttempts
);

export default router;
