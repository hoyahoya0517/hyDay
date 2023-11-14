import * as usersRepository from "../data/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function login(req, res) {
  const { code } = req.body;
  const foundUser = await usersRepository.findByCode(code);
  if (!foundUser) {
    return res.sendStatus(401);
  }
  const token = createToken(code);
  res.status(200).json({ username: foundUser.username, token });
}

function createToken(code) {
  return jwt.sign({ code }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3h",
  });
}

export async function me(req, res) {
  const foundUser = await usersRepository.findByCode(req.code);
  if (!foundUser) return res.sendStatus(401);
  res.status(200).json({ username: foundUser.username, token: req.token });
}

export async function nameChange(req, res) {
  const { newname } = req.body;
  const newUsername = await usersRepository.changeNameByCode(req.code, newname);
  if (!newUsername) return res.sendStatus(401);
  res.status(200).json({ newUsername });
}
