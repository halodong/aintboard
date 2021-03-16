import { nanoid } from "nanoid";

export async function insertUser(db, { userName, email, password }) {
  return db
    .collection("users")
    .insertOne({
      _id: nanoid(12),
      userName,
      email,
      password,
    })
    .then(({ ops }) => ops[0]);
}
