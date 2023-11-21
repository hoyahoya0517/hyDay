import { findByCode } from "../data/auth.js";
import * as feedbackRepository from "../data/feedback.js";

export async function getFeedback(req, res, next) {
  const feedback = await feedbackRepository.getAllFeedback();
  res.status(200).json(feedback);
}

export async function createFeedback(req, res, next) {
  const { text } = req.body;
  const { code, username } = await findByCode(req.code);
  if (!username) return res.sendStatus(401);
  const newFeedback = {
    id: new Date().toISOString(),
    text,
    createdAt: new Date().toISOString(),
    code,
    username,
    comments: [],
  };
  feedbackRepository.createFeedback(newFeedback);
  res.sendStatus(201);
}

export async function updateFeedback(req, res, next) {
  const id = req.params.id;
  const { text } = req.body;
  const code = req.code;
  const foundFeedback = await feedbackRepository.getFeedbackById(id);
  if (!foundFeedback) return res.sendStatus(404);
  if (foundFeedback.code != code) return res.sendStatus(403);
  const createdAt = new Date().toISOString();
  feedbackRepository.updateFeedback(id, text, createdAt);
  res.sendStatus(200);
}

export async function deleteFeedback(req, res, next) {
  const id = req.params.id;
  const code = req.code;
  const foundFeedback = await feedbackRepository.getFeedbackById(id);
  if (!foundFeedback) return res.sendStatus(404);
  if (foundFeedback.code !== code) return res.sendStatus(403);
  feedbackRepository.deleteFeedback(id);
  res.sendStatus(204);
}

export async function createComment(req, res, next) {
  const id = req.params.id;
  const { text } = req.body;
  const { code, username } = await findByCode(req.code);
  const newComment = {
    id: new Date().toISOString(),
    parentId: id,
    text,
    createdAt: new Date().toISOString(),
    code,
    username,
  };
  await feedbackRepository.createFeedbackComment(id, newComment);
  res.sendStatus(201);
}

export async function deleteComment(req, res, next) {
  const { id, commentId } = req.params;
  const code = req.code;
  const foundFeedback = await feedbackRepository.getFeedbackById(id);
  if (!foundFeedback) return res.sendStatus(404);
  const foundComment = foundFeedback.comments.find(
    (comment) => comment.id == commentId
  );
  if (!foundComment) return res.sendStatus(404);
  if (foundComment.code != code) res.sendStatus(403);
  await feedbackRepository.deleteFeedbackComment(id, commentId);
  res.sendStatus(204);
}
