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
      message: `User won ${trophyType} trophy`,
      data: {
        userTrophy: champion.ops[0],
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/champion.js", "Can't insert champion");
  }
}

export const filterChampions = async (db, { first, filter, field }) => {
  try {
    let champions = null;
    first = first ? parseInt(first) : null;

    if (filter && field) {
      let aggregate = [
        {
          $match: {
            [filter]: field,
          },
        },
        {
          $project: { password: 0 },
        },
      ];

      if (first) {
        //with limit
        aggregate.push({ $limit: first });
      }

      champions = await db.collection("user_trophies").aggregate(aggregate);
    }

    const championsArray = await champions.toArray();

    return getSuccessResponse({
      message: "Filtered Champions",
      data: {
        champions: championsArray,
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/user.js", "Filter Champions error");
  }
};
