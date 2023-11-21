import { getFeedback } from "../database/database.js";

let feedback = [
  {
    id: "2023-11-16T02:27:14.323Z",
    text: "hi",
    createdAt: "2023-11-16T02:27:14.323Z",
    code: "1901",
    username: "he",
    comments: [
      {
        id: "456",
        parentId: "2023-11-16T02:27:14.323Z",
        text: "kk",
        createdAt: "2023-11-16T02:27:14.323Z",
        code: "1901",
        username: "he",
      },
      {
        id: "456",
        parentId: "2023-11-16T02:27:14.323Z",
        text: "kk",
        createdAt: "2023-11-16T02:27:14.323Z",
        code: "1901",
        username: "he",
      },
      {
        id: "456",
        parentId: "2023-11-16T02:27:14.323Z",
        text: "kk",
        createdAt: "2023-11-16T02:27:14.323Z",
        code: "1901",
        username: "he",
      },
    ],
  },
  {
    id: "456",
    text: "hi22222222222hi2222222222  2hi2222222 2222hi22222222222hi22222222222hi22222222222hi22222222222hi2222 2222222hi2222 2222222hi2222 2222222hi22222222222hi22222222222hi22222222222hi22222222222hi22222222222hi22222222222hi22222222222hi22222222222hi22222222222",
    createdAt: "2023-11-07",
    code: "0517",
    username: "gun",
    comments: [],
  },
  {
    id: "43532453245",
    text: "hi22222222222",
    createdAt: "2023-11-07",
    code: "0517",
    username: "gun",
    comments: [
      {
        id: "456",
        parentId: "2023-11-16T02:27:14.323Z",
        text: "kk",
        createdAt: "2023-11-16T02:27:14.323Z",
        code: "1901",
        username: "he",
      },
    ],
  },
  {
    id: "324532452345",
    text: "hi22222222222",
    createdAt: "2023-11-07",
    code: "0517",
    username: "gun",
    comments: [
      {
        id: "456",
        parentId: "2023-11-16T02:27:14.323Z",
        text: "kk",
        createdAt: "2023-11-16T02:27:14.323Z",
        code: "1901",
        username: "he",
      },
    ],
  },
  {
    id: "234324",
    text: "hi22222222222",
    createdAt: "2023-11-07",
    code: "0517",
    username: "gun",
    comments: [
      {
        id: "456",
        parentId: "2023-11-16T02:27:14.323Z",
        text: "kk",
        createdAt: "2023-11-16T02:27:14.323Z",
        code: "1901",
        username: "he",
      },
    ],
  },
  {
    id: "23423423451",
    text: "hi22222222222",
    createdAt: "2023-11-07",
    code: "0517",
    username: "gun",
    comments: [
      {
        id: "456",
        parentId: "2023-11-16T02:27:14.323Z",
        text: "kk",
        createdAt: "2023-11-16T02:27:14.323Z",
        code: "1901",
        username: "he",
      },
    ],
  },
  {
    id: "5423451",
    text: "hi22222222222",
    createdAt: "2023-11-07",
    code: "0517",
    username: "gun",
    comments: [
      {
        id: "456",
        parentId: "2023-11-16T02:27:14.323Z",
        text: "kk",
        createdAt: "2023-11-16T02:27:14.323Z",
        code: "1901",
        username: "he",
      },
    ],
  },
  {
    id: "4657",
    text: "hi22222222222",
    createdAt: "2023-11-07",
    code: "0517",
    username: "gun",
    comments: [
      {
        id: "456",
        parentId: "2023-11-16T02:27:14.323Z",
        text: "kk",
        createdAt: "2023-11-16T02:27:14.323Z",
        code: "1901",
        username: "he",
      },
    ],
  },
  {
    id: "56745345",
    text: "hi22222222222",
    createdAt: "2023-11-07",
    code: "0517",
    username: "gun",
    comments: [
      {
        id: "456",
        parentId: "2023-11-16T02:27:14.323Z",
        text: "kk",
        createdAt: "2023-11-16T02:27:14.323Z",
        code: "1901",
        username: "he",
      },
    ],
  },
  {
    id: "67654",
    text: "",
    createdAt: "2023-11-07",
    code: "0517",
    username: "gun",
    comments: [
      {
        id: "456",
        parentId: "2023-11-16T02:27:14.323Z",
        text: "kk",
        createdAt: "2023-11-16T02:27:14.323Z",
        code: "1901",
        username: "he",
      },
    ],
  },
];

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
export async function updateFeedback(id, text, createdAt) {
  getFeedback().findOneAndUpdate(
    {
      id,
    },
    {
      $set: {
        text,
        createdAt,
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
  const data = await getFeedback().findOneAndUpdate(
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
  return data;
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
