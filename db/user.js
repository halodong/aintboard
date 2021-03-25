import { nanoid } from "nanoid";

export async function insertUser(
  db,
  { firstName, lastName, email, password, role, username }
) {
  return db
    .collection("users")
    .insertOne({
      _id: nanoid(12),
      firstName,
      lastName,
      email,
      password,
      role,
      username,
      powerups: 0,
      stars: 0,
    })
    .then(({ ops }) => ops[0]);
}
