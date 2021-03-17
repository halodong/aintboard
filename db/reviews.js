import { nanoid } from "nanoid";

import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export async function insertReview(
  db,
  { userId, bgId, reviewText, reviewStatusId, reviewType }
) {
  try {
    const review = await db.collection("reviews").insertOne({
      _id: nanoid(12),
      userId,
      bgId,
      reviewText,
      reviewStatusId,
      reviewType,
      createdAt: new Date(),
    });

    return getSuccessResponse({
      message: "Review added",
      data: {
        review: review.ops[0],
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/reviews.js");
  }
}
