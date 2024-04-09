import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (adminId) => {
  const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
