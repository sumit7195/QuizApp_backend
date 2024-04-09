import jwt from "jsonwebtoken";
import "dotenv/config";


export const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) return res.status(401).json({ message: "Unauthorized access" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token not valid" });
    req.userID = decoded.id;
    next();
  });
};
