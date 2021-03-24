import { nanoid } from "nanoid";

export async function insertBattle(
  db,
  { battleName, boardGameName, bgId, details, eventStartDate, eventEndDate }
) {
  return db
    .collection("online_battle")
    .insertOne({
      _id: nanoid(12),
      battleName,
      boardGameName,
      bgId,
      details,
      eventStartDate,
      eventEndDate,
      createdAt: new Date(),
    })
    .then(({ ops }) => ops[0]);
}

export async function insertValidEntry(
  db,
  { userId, battleId, score, message, googleLink, verifiedStatus }
) {
  return db
    .collection("user_ob_entry")
    .insertOne({
      _id: nanoid(12),
      userId,
      battleId,
      score,
      message,
      googleLink,
      verifiedStatus,
      createdAt: new Date(),
    })
    .then(({ ops }) => ops[0]);
}
