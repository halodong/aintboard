import { nanoid } from "nanoid";

import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export async function insertChampion(db, { userId, trophyType, battleId }) {
  try {
    const champion = await db.collection("user_trophies").insertOne({
      _id: nanoid(12),
      userId,
      trophyType,
      battleId,
    });

    return getSuccessResponse({
      message: "Champion Added",
      data: {
        review: champion.ops[0],
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/champion.js");
  }
}
