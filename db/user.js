import { nanoid } from "nanoid";

export async function insertUser(db, { firstName, lastName, email, password }) {
  return db
    .collection("users")
    .insertOne({
      _id: nanoid(12),
      firstName,
      lastName,
      email,
      password,
    })
    .then(({ ops }) => ops[0]);
}
