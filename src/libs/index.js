import jwt from "jsonwebtoken";
const secret = "gfjkskjgsjkgjksgjksjkgjksgjksjkgjksgjksjkgjskgjksgjksgjk";


export const generateToken = ( adminId ) => {
  const token = jwt.sign({ id: adminId }, secret, { expiresIn: "1h" });
  return token;
};
