import { nanoid } from "nanoid";

export async function insertReview(db, { userId, bgId, reviewText }) {
  return db
    .collection("reviews")
    .insertOne({
      _id: nanoid(12),
      userId,
      bgId,
      reviewText,
      createdAt: new Date(),
    })
    .then(({ ops }) => ops[0]);
}
