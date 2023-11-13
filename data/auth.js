const users = [
  {
    code: "1901",
    username: "😑⭐",
  },
  {
    code: "0517",
    username: "🍄✨",
  },
];

export async function findByCode(code) {
  const found = users.find((user) => {
    return user.code === code;
  });
  return found;
}
