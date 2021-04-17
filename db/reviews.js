import { nanoid } from "nanoid";

import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export async function insertReview(
  db,
  {
    userId,
    bgName,
    reviewContent,
    reviewStatus,
    reviewType,
    replayabilityRating,
    componentsRating,
    complexityRating,
    aestheticsRating,
    valueForMoneyRating,
    playingTimeRating,
    overallRating,
    images,
    reviewTitle,
    language,
    youtubeUrl,
  }
) {
  try {
    const review = await db.collection("reviews").insertOne({
      _id: nanoid(12),
      userId,
      bgName,
      reviewContent,
      reviewStatus,
      reviewType,
      replayabilityRating,
      componentsRating,
      complexityRating,
      aestheticsRating,
      valueForMoneyRating,
      playingTimeRating,
      overallRating,
      images,
      reviewTitle,
      language,
      youtubeUrl,
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
        as: "userData",
      },
    };

    if (first) {
      reviews = await db
        .collection("reviews")
        .aggregate([{ $limit: first }, lookup]);
    } else {
      reviews = await db.collection("reviews").aggregate([lookup]);
    }
    const reviewArray = await reviews.toArray();

    const reviewsCount = reviewArray.length;

    return getSuccessResponse({
      message:
        reviewsCount === 1
          ? "1 Review retrieved"
          : reviewsCount > 1
          ? `${reviewsCount} Reviews retrieved`
          : `No Reviews retrieved`,
      data: {
        reviews: reviewArray,
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/reviews.js", "Couldn't get reviews");
  }
}

export const filterReviews = async (db, { first, filter, field }) => {
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
        as: "userData",
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
    }

    const reviewArray = await reviews.toArray();

    return getSuccessResponse({
      message: "Filtered Reviews",
      data: {
        reviews: reviewArray,
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/reviews.js", "Filter Reviews error");
  }
};
