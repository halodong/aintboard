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
