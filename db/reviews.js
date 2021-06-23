import { nanoid } from "nanoid";
import slug from "limax";

import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export async function insertReview(
  db,
  {
    userId,
    username,
    bgName,
    content,
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
    title,
    language,
    youtubeUrl,
  }
) {
  try {
    const slugText = slug(`${title} ${username}`);

    const review = await db.collection("reviews").insertOne({
      _id: nanoid(12),
      userId,
      slug: slugText,
      bgName,
      content,
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
      title,
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

export async function getReviews(db, { first, offset }) {
  try {
    let reviews = null;
    first = first ? parseInt(first) : null;
    offset = offset ? parseInt(offset) : 0;

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

    let totalReviewsCount = 0;

    if (first) {
      reviews = await db
        .collection("reviews")
        .aggregate([
          { $sort: { createdAt: -1 } },
          { $skip: offset },
          { $limit: first },
          lookup,
        ]);

      const totalReviews = await db.collection("reviews");

      totalReviewsCount = await totalReviews.count();
    } else {
      reviews = await db
        .collection("reviews")
        .aggregate([{ $sort: { createdAt: -1 } }, lookup]);
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
        totalReviewsCount,
        hasMore: first + offset < totalReviewsCount,
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
            [filter]: new RegExp(field, "i"),
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

export const reviewStatus = async (db, { status, id }) => {
  try {
    await db
      .collection("reviews")
      .updateOne({ _id: id }, { $set: { reviewStatus: status } });

    return getSuccessResponse({
      message: "Review Updated",
    });
  } catch (err) {
    return getFailedResponse(err, "db/reviews.js", "Filter Reviews error");
  }
};

export const deleteReview = async (db, { id }) => {
  try {
    await db.collection("reviews").deleteOne({ _id: id });

    return getSuccessResponse({
      message: "Review Deleted",
    });
  } catch (err) {
    return getFailedResponse(err, "db/reviews.js", "Filter Reviews error");
  }
};
