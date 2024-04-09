import express from "express";
import QuizControllers from "../controllers/QuizControllers.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", QuizControllers.getAllQuiz);
router.get("/:id", verifyToken, QuizControllers.getDetailOfQuiz);
export default router;
