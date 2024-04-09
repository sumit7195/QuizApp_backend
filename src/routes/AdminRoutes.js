import express from "express";
import AdminControllers from "../controllers/AdminControllers.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", AdminControllers.createAdmin);
router.post("/login", AdminControllers.loginAdmin);
router.post("/quizzes", verifyToken, AdminControllers.createQuiz);
router.get(
  "/admin-quizzes",
  verifyToken,
  AdminControllers.getQuizCreatedByAdmin
);
router.put("/quizzes/:id", verifyToken, AdminControllers.updateQuiz);
router.delete("/quizzes/:id", verifyToken, AdminControllers.deleteQuiz);

export default router;
