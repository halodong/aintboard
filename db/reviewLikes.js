import { nanoid } from "nanoid";

import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export async function getLikes(db, { reviewId }) {
  try {
    const totalLikes = await db
      .collection("review_likes")
      .countDocuments({ reviewId: { $eq: reviewId } });

    return getSuccessResponse({
      totalLikes,
      message: "Likes count retrieved",
    });
  } catch (err) {
    return getFailedResponse(
      err,
      "db/reviewLikes.js",
      "Can't retrieve likes count"
    );
  }
}

export async function getUserLikes(db, { reviewId, userId }) {
  try {
    const userLikes = await db
      .collection("review_likes")
      .find({ userId, reviewId });

    const userLikesArr = await userLikes.toArray();

    return getSuccessResponse({
      message: "User like on review",
      data: {
        userLikes: userLikesArr,
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/reviewLikes.js", "Can't get user likes");
  }
}

export async function likeReview(db, { userId, reviewId }) {
  const userLikes = await db
    .collection("review_likes")
    .find({ userId, reviewId });

  const userLikesArr = await userLikes.toArray();

  //user has liked the review, dont allow them to like again
  if (userLikesArr.length > 0) {
    return getFailedResponse(
      "User has liked this review",
      "db/reviewLikes.js",
      "You can't like this review again"
    );
  }

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
          { _id: userId },
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
        message: "Like added",
      });
    }
  } catch (err) {
    return getFailedResponse(err, "db/reviewLikes.js");
  }
}
