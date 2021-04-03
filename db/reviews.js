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

export async function getReviews(db, { first, filter, field }) {
  try {
    let reviews = null;
    first = first ? parseInt(first) : null;

    //get users data who made the review
    const lookup = {
      $lookup: {
        from: "users",
        let: { userId: "$userId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$$userId", "$_id"] }],
              },
            },
          },
          { $project: { password: 0 } },
        ],
        as: "users",
      },
    };

    if (filter && field) {
      field = filter === "bgId" ? parseInt(field) : field;

      let aggregate = [
        {
          $match: {
            [filter]: field,
          },
        },
        lookup,
      ];

      if (first) {
        //with limit
        aggregate.push({ $limit: first });
      }

      reviews = await db.collection("reviews").aggregate(aggregate);
    } else if (first) {
      reviews = await db
        .collection("reviews")
        .aggregate([{ $limit: first }, lookup]);
    } else {
      reviews = await db.collection("reviews").aggregate([lookup]);
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
