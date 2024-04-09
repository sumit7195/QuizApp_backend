import { Quiz } from "../models/qustionModel.js";

const getAllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    console.log("all the quizzes", quizzes);

    return res.status(200).json(quizzes);
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getDetailOfQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default { getAllQuiz,getDetailOfQuiz };
