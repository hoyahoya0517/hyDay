import { getUsers } from "../database/database.js";

async function getUser() {
  return getUsers()
    .find()
    .toArray()
    .then((data) => data);
}

export async function findByCode(code) {
  const data = await getUser();
  const found = data.find((user) => {
    return user.code === code;
  });
  return found;
}

export async function changeNameByCode(code, newname) {
  const data = await getUsers().findOneAndUpdate(
    {
      code,
    },
    {
      $set: {
        username: newname,
      },
    },
    { returnDocument: "after" }
  );
  if (data) return data.username;
  else return;
}
