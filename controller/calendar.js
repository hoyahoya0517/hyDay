import * as calendarRepository from "../data/calendar.js";

export async function getCalendar(req, res, next) {
  const hyDays = await calendarRepository.getHyDays();
  res.json(hyDays);
}

export async function createMemo(req, res, next) {
  const { date, memo } = req.body;
  const foundCheck = await calendarRepository.findHyDays(date);
  if (foundCheck) {
    calendarRepository.updateMemo(date, memo);
  } else {
    calendarRepository.createMemo(date, memo);
  }
  res.sendStatus(201);
}

export async function createEvent(req, res, next) {
  const { date, events } = req.body;
  const foundCheck = await calendarRepository.findHyDays(date);
  if (foundCheck) {
    calendarRepository.updateEvent(date, events);
  } else {
    calendarRepository.createEvent(date, events);
  }
  res.sendStatus(201);
}

export async function deleteDay(req, res, next) {
  const { date } = req.params;
  calendarRepository.deleteDay(date);
  res.sendStatus(204);
}
