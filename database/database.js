import dotenv from "dotenv";
import { MongoClient } from "mongodb";
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
