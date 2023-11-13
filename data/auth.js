const users = [
  {
    code: "1901",
    realname: "김희연",
    username: "he",
  },
  {
    code: "0517",
    realname: "이건호",
    username: "gun",
  },
];

export async function findByCode(code) {
  const found = users.find((user) => {
    return user.code === code;
  });
  return found;
}
