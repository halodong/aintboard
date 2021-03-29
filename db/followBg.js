import { nanoid } from "nanoid";

import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export async function insertFollowBg(db, { userId, bgId }) {
  try {
    const follow = await db.collection("user_bg_follows").insertOne({
      _id: nanoid(12),
      userId,
      bgId,
    });

    return getSuccessResponse({
      message: `User followed boardgame ${bgId}`,
      data: {
        followBg: follow.ops[0],
      },
    });
  } catch (err) {
    return getFailedResponse(
      err,
      "db/followBg.js",
      "Failed to follow boardgame"
    );
  }
}
