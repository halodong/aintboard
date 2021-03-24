import { nanoid } from "nanoid";

export async function insertValidEntry(
  db,
  { battleId, score, message, googleLink, verifiedStatus }
) {
  return db
    .collection("user_ob_entry")
    .insertOne({
      _id: nanoid(12),
      battleId,
      score,
      message,
      googleLink,
      verifiedStatus,
      createdAat: new Date(),
    })
    .then(({ ops }) => ops[0]);
}
