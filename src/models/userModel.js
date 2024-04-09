import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  quizzesAttempted: [
    {
      quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
      score: { type: Number, default: 0 },
      totalQuestions: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  
});

const User = mongoose.model("User", userSchema);

export default User;
