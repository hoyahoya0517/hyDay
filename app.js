import express from "express";
import "express-async-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import calendarRouter from "./router/calendar.js";
import { connectDB } from "./database/database.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(helmet());

app.use("/calendar", calendarRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

connectDB().then(() => {
  console.log("--server start--");
  app.listen(8080);
});
