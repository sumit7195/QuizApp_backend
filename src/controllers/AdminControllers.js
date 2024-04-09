import Admin from "../models/adminModel.js";
import { Quiz } from "../models/qustionModel.js";
import { generateToken } from "../libs/index.js";
import bcrypt from "bcrypt";

const createAdmin = async (req, res) => {
  const { userName, password } = req.body;

  try {
    // check if userName exists alre

    const alreadyExists = await Admin.findOne({ userName });

    if (alreadyExists) {
      return res.status(400).json({ message: "User Already exists" });
    }

    // will do hashing of password
    const hashedPassword = await bcrypt.hash(password, 10);

    // // will create new admin
    const newAdmin = new Admin({ userName, password: hashedPassword });
    newAdmin.save();

    return res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  // find admin with userName
  try {
    const admin = await Admin.findOne({ userName: username });

    if (!admin) {
      return res.status(404).json({ message: "Invalid UserName Or password" });
    }

    const isPasswordValid = await bcrypt.compareSync(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid UserName or password" });
    }

    // if userName and password are valid

    const token = generateToken(admin.id);
    res.json({ token });
  } catch (err) {
    console.log("err", err);
  }
};

const createQuiz = async (req, res) => {
  const { title, description, questions } = req.body;
  const createdBy = req.userID;

  try {
    const quiz = await Quiz.create({
      title,
      description,
      questions,
      createdBy,
    });
    res.status(201).json(quiz);
  } catch (err) {
    console.log("err", err);

    res.status(500).json({ message: "Something went wrong" });
  }
};

const getQuizCreatedByAdmin = async (req, res) => {
  console.log("req", req);
  try {
    // Assuming you have a field like createdBy or adminId in your Quiz model
    const quizzes = await Quiz.find({ createdBy: req.userID }); // Adjust the field name as per your schema

    console.log("quizzes", quizzes);

    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching admin quizzes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title, description, questions } = req.body;

  console.log("updated Quseion", questions);

  try {
    const quiz = await Quiz.findByIdAndUpdate(
      id,
      { title, description, questions },
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findByIdAndDelete(id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createAdmin,
  loginAdmin,
  createQuiz,
  getQuizCreatedByAdmin,
  updateQuiz,
  deleteQuiz,
};
