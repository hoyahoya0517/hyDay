import express from "express";
import "express-async-errors";
import * as authController from "../controller/auth.js";
import { body, validationResult } from "express-validator";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateCredential = [
  body("code").trim().notEmpty().isNumeric().isLength({ max: 4 }),
  (req, res, next) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
      return next();
    }
    return res.sendStatus(400);
  },
];

router.post("/login", validateCredential, authController.login);
router.get("/me", isAuth, authController.me);

export default router;
