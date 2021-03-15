export async function insertUser(db, { userName, email, password }) {
  return db
    .collection("users")
    .insertOne({
      userName,
      email,
      password,
    })
    .then(({ ops }) => ops[0]);
}
