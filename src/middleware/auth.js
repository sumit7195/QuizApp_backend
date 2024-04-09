import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) return res.status(401).json({ message: "Unauthorized access" });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token not valid" });
    req.userID = decoded.id;
    next();
  });
};
