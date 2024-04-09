import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";


import AdminRoutes from "./routes/AdminRoutes.js";
import QuizRoutes from "./routes/QuizRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";


//connecttion string
const connectionString =
  "mongodb+srv://sumitrrai:Ravi123@cluster0.mjrtyqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// secret string for JWT

mongoose.connect(connectionString).then(() => {
  console.log("Database connection established");
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/admin", AdminRoutes);
app.use("/api/quizzes", QuizRoutes);
app.use("/api/users", UserRoutes);


app.listen(7000, () => {
  console.log("server started on port 7000");
});
