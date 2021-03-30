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

export async function getReviews(db, { first }) {
  try {
    let reviews = null;

    if (first) {
      reviews = await db.collection("reviews").aggregate([
        { $limit: first },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "users",
          },
        },
      ]);
    } else {
      reviews = await db.collection("reviews").aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "users",
          },
        },
      ]);
    }

    const reviewArray = await reviews.toArray();

    return getSuccessResponse({
      message: !first
        ? "Reviews retrieved"
        : first > 1
        ? `${first} Reviews retrieved`
        : `${first} Review retrieved`,
      data: {
        reviews: reviewArray,
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/reviews.js", "Couldn't get reviews");
  }
}
