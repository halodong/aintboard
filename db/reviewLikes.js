import { nanoid } from "nanoid";

import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export async function likeReview(db, { userId, reviewId }) {
  await db.collection("review_likes").insertOne({
    _id: nanoid(12),
    userId,
    reviewId,
    createdAt: new Date(),
  });

  try {
    const totalLikes = await db
      .collection("review_likes")
      .countDocuments({ reviewId: { $eq: reviewId } });

    if (totalLikes % 10 === 0) {
      //@todo move this in /db dir
      let usersRes = await db
        .collection("users")
        .findOneAndUpdate(
          { id: userId },
          { $inc: { stars: 1 } },
          { returnOriginal: false }
        );

      return getSuccessResponse({
        totalLikes,
        message: `You now have ${usersRes.value.stars} stars`,
      });
    } else {
      return getSuccessResponse({
        totalLikes,
      });
    }
  } catch (err) {
    return getFailedResponse(err, "db/reviewLikes.js");
  }
}
