import { nanoid } from "nanoid";

import { getSuccessResponse } from "~/util/apiResponse";

export async function commentReview(db, { userId, reviewId, comment }) {
  let commentRes = await db.collection("review_comments").insertOne({
    _id: nanoid(12),
    userId,
    reviewId,
    comment,
    createdAt: new Date(),
  });

  return getSuccessResponse({
    message: "Comment added",
    data: {
      comment: commentRes.ops[0],
    },
  });
}
