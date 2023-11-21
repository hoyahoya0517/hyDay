import { getFeedback } from "../database/database.js";

export async function getAllFeedback() {
  return getFeedback()
    .find()
    .toArray()
    .then((data) => data);
}

export async function getFeedbackById(id) {
  const data = await getAllFeedback();
  const found = data.find((feed) => feed.id == id);
  return found;
}

export async function createFeedback(newFeedback) {
  getFeedback().insertOne(newFeedback);
}
export async function updateFeedback(id, text) {
  getFeedback().findOneAndUpdate(
    {
      id,
    },
    {
      $set: {
        text,
      },
    }
  );
}
export async function deleteFeedback(id) {
  getFeedback().deleteOne({ id });
}

export async function createFeedbackComment(id, newComment) {
  const found = await getFeedback()
    .findOne({ id })
    .then((data) => data);
  const comments = found.comments;
  comments.unshift(newComment);
  await getFeedback().findOneAndUpdate(
    {
      id,
    },
    {
      $set: {
        comments,
      },
    },
    { returnDocument: "after" }
  );
}

export async function deleteFeedbackComment(id, commentId) {
  const found = await getFeedback()
    .findOne({ id })
    .then((data) => data);
  let comments = found.comments;
  comments = comments.filter((comment) => comment.id !== commentId);
  await getFeedback().findOneAndUpdate(
    {
      id,
    },
    {
      $set: {
        comments,
      },
    },
    { returnDocument: "after" }
  );
}
