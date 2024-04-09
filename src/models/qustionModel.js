import mongoose from "mongoose";



const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  questionType: {
    type: String,
    enum: ["MCQ", "YesNo", "Custom"],
    required: true,
  },
  options: [{ type: String }],
  correctAnswer: { type: String },
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [questionSchema],
  createdBy: { type: mongoose.Schema.ObjectId, ref: "Admin" },
});

const Questions = mongoose.model("Question", questionSchema);
const Quiz = mongoose.model("Quiz", quizSchema);


export { Questions, Quiz };
