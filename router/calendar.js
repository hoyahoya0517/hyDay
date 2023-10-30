import express from "express";
import "express-async-errors";
import * as calendarController from "../controller/calendar.js";

const router = express.Router();

router.get("/", calendarController.getCalendar);
router.post("/memo", calendarController.createMemo);
router.post("/event", calendarController.createEvent);
router.delete("/:date", calendarController.deleteDay);

export default router;
