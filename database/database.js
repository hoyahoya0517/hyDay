import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.DB_HOST;

let db;
export async function connectDB() {
  const client = new MongoClient(uri);
  db = client.db("Ho");
}
export function getHyDay() {
  return db.collection("hyDay");
}
export function getUsers() {
  return db.collection("users");
}
export function getFeedback() {
  return db.collection("feedback");
}
