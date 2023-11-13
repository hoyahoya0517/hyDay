import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as usersRepository from "../data/auth.js";
dotenv.config();

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer")))
    return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) return res.sendStatus(401);
    const foundUser = await usersRepository.findByCode(decoded.code);
    if (!foundUser) return res.sendStatus(401);
    req.code = foundUser.code;
    req.token = token;
    next();
  });
};
