import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const submitQuiz = async (req, res) => {
  const { id } = req.params;
  const userID = req.userID;
  const { answers } = req.body;

  console.log("Received request to submit quiz:", id, userID, answers); // Log request data

  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Validate that all questions are answered
    const questionIds = quiz.questions.map((q) => q._id.toString());
    const answeredQuestionIds = Object.keys(answers);

    const missingQuestions = questionIds.filter(
      (qId) => !answeredQuestionIds.includes(qId)
    );

    if (missingQuestions.length > 0) {
      return res.status(400).json({ message: "Please answer all questions" });
    }

    // Calculate score based on correct answers
    let score = 0;
    quiz.questions.forEach((question) => {
      if (answers[question._id.toString()] === question.correctAnswer) {
        score++;
      }
    });

    console.log("Calculated score:", score); // Log calculated score

    // Update user's progress
    const user = await User.findByIdAndUpdate(
      userID,
      {
        $push: {
          quizzesAttempted: {
            quizId: id,
            score,
            totalQuestions: quiz.questions.length,
            percentage: (score / quiz.questions.length) * 100,
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    console.log("Updated user:", user); // Log updated user

    res.json({
      score,
      totalQuestions: quiz.questions.length,
      percentage: (score / quiz.questions.length) * 100,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const fetchUserQuizAttempts = async (req, res) => {
  const { userID } = req;

  console.log(req.userID);

  try {
    const user = await User.findById(userID);

    console.log("User", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const quizAttempts = user.quizzesAttempted.map((attempt) => ({
      quizId: attempt.quizId,
      score: attempt.score,
      totalQuestions: attempt.totalQuestions,
      percentage: attempt.percentage,
      timestamp: attempt.timestamp,
    }));

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { registerUser, loginUser, submitQuiz, fetchUserQuizAttempts };
