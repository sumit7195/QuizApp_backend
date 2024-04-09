import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import "dotenv/config";


import AdminRoutes from "./routes/AdminRoutes.js";
import QuizRoutes from "./routes/QuizRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";





mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
  console.log("Database connection established");
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/admin", AdminRoutes);
app.use("/api/quizzes", QuizRoutes);
app.use("/api/users", UserRoutes);
/// middleware to verify JWT token

// Define routes for admin authenication

// routes for creating quiz

// app.post("/api/admin/quizzes", verifyToken, );

// Add a new question to an existing quiz
// app.post("/api/admin/quiz/:id/questions", verifyToken, async (req, res) => {
//   const { id } = req.params;
//   console.log("ids", typeof id);
//   const { questionText, options, correctAnswer, questionType } = req.body;

//   console.log(questionText, options, correctAnswer, questionType);

//   try {
//     const quiz = await Quiz.findById(id);
//     if (!quiz) {
//       return res.status(404).json({ message: "Quiz not found" });
//     }

//     const newQuestion = { questionText, options, correctAnswer, questionType };
//     quiz.questions.push(newQuestion);

//     await quiz.save();
//     res.json({ message: "Question added successfully", newQuestion });
//   } catch (error) {
//     console.error("Error adding question:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// get All the quizzes

// app.get("/api/quizzes", async (req, res) => {
//   try {
//     const quizzes = await Quiz.find({});
//     console.log("all the quizzes", quizzes);

//     return res.status(200).json(quizzes);
//   } catch (err) {
//     console.log("err", err);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// });

// get detail of the quiz
// app.get("/api/quizzes/:id", verifyToken, async (req, res) => {
//   const { id } = req.params;

//   try {
//     const quiz = await Quiz.findById(id);
//     if (!quiz) {
//       return res.status(404).json({ message: "Quiz not found" });
//     }

//     res.json(quiz);
//   } catch (error) {
//     console.error("Error fetching quiz details:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// fetch quizzes created by admin

// app.get("/api/admin-quizzes", verifyToken, );

// to update the quiz

// app.put("/api/quizzes/:id", verifyToken, );

// route for deleting quiz
// app.delete("/api/quizzes/:id", verifyToken, );

// to update a question of quiz

// app.put(
//   "/api/quizzes/:quizId/questions/:questionId",
//   verifyToken,
//   async (req, res) => {
//     const { quizId, questionId } = req.params;
//     const { questionText, questionType, options, correctAnswer } = req.body;

//     try {
//       const quiz = await Quiz.findOneAndUpdate(
//         { _id: quizId, "questions._id": questionId },
//         {
//           $set: {
//             "questions.$.questionText": questionText,
//             "questions.$.questionType": questionType,
//             "questions.$.correctAnswer": correctAnswer,
//             "questions.$.options": options,
//           },
//         },
//         { new: true }
//       );

//       if (!quiz)
//         return res.status(404).json({ message: "Quiz or Questions not found" });
//       res.json(quiz);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "Something went wrong" });
//     }
//   }
// );

//to delete a question

// app.delete("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
//   const { quizId, questionId } = req.params;

//   try {
//     // Check if the quiz exists
//     const quiz = await Quiz.findById(quizId);

//     if (!quiz) {
//       return res.status(404).json({ message: "Quiz not found" });
//     }

//     // Check if the question exists in the quiz
//     const questionIndex = quiz.questions.findIndex((q) => q._id == questionId);

//     if (questionIndex === -1) {
//       return res
//         .status(404)
//         .json({ message: "Question not found in the quiz" });
//     }

//     // Remove the question from the quiz
//     quiz.questions.splice(questionIndex, 1);
//     await quiz.save();

//     res.json({ message: "Question deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// create admin routes

// app.post("/api/admin/create",);

// app.post("/api/admin/login",);

///////////////////////////USER-Routes//////////////////////////////////////////////////////////////

// registration for user

// app.post("/api/users/register");

/// for user login

// app.post("/api/users/login");

/// submit the Quiz

// app.post("/api", verifyToken, );

// Route for fetching user quiz attempts and scores
// app.get("/api/users/quiz-attempts", verifyToken, );

app.listen(7000, () => {
  console.log("server started on port 7000");
});
