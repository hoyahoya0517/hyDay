import express from "express";
import "express-async-errors";
import * as feedbackController from "../controller/feedback.js";
import { isAuth } from "../middleware/auth.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

const validateFeedback = [
  body("text").trim().notEmpty(),
  (req, res, next) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
      return next();
    }
    return res.sendStatus(400);
  },
];

router.get("/", feedbackController.getFeedback);
router.post("/", isAuth, validateFeedback, feedbackController.createFeedback);
router.put("/:id", isAuth, validateFeedback, feedbackController.updateFeedback);
router.delete("/:id", isAuth, feedbackController.deleteFeedback);
router.post(
  "/comment/:id",
  isAuth,
  validateFeedback,
  feedbackController.createComment
);
router.delete(
  "/comment/:id/:commentId",
  isAuth,
  feedbackController.deleteComment
);

export default router;
