import express from "express";
import "express-async-errors";
import * as authController from "../controller/auth.js";
import { body, validationResult } from "express-validator";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateCredentialLogin = [
  body("code").trim().notEmpty().isLength({ max: 4 }),
  (req, res, next) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
      return next();
    }
    return res.sendStatus(400);
  },
];

const validateCredentialNameChange = [
  body("newname").trim().notEmpty().isLength({ max: 6 }),
  (req, res, next) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
      return next();
    }
    return res.sendStatus(400);
  },
];

router.post("/login", validateCredentialLogin, authController.login);
router.get("/me", isAuth, authController.me);
router.post(
  "/name",
  isAuth,
  validateCredentialNameChange,
  authController.nameChange
);

export default router;
