import { getHyDay } from "../database/database.js";

export async function getHyDays() {
  return getHyDay()
    .find()
    .toArray()
    .then((data) => data);
}

export async function findHyDays(date) {
  const data = await getHyDays();
  const found = data.find((day) => {
    return day.date === date;
  });
  if (found) return true;
  else return false;
}
export function createMemo(date, memo) {
  const newHyDay = {
    date,
    events: [],
    memo,
  };
  getHyDay().insertOne(newHyDay);
}

export function updateMemo(date, memo) {
  getHyDay().findOneAndUpdate(
    { date },
    {
      $set: {
        memo,
      },
    }
  );
}

export function createEvent(date, events) {
  const newHyDay = {
    date,
    events,
    memo: "",
  };
  getHyDay().insertOne(newHyDay);
}

export function updateEvent(date, events) {
  getHyDay().findOneAndUpdate(
    { date },
    {
      $set: {
        events,
      },
    }
  );
}

export function deleteDay(date) {
  console.log(date);
  getHyDay().deleteOne({ date: date });
}
