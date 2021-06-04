import slug from "limax";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export async function insertBattle(
  db,
  {
    battleName,
    boardGameName,
    bgImage,
    details,
    eventStartDate,
    eventEndDate,
    createdBy,
    status,
  }
) {
  try {
    const slugText = slug(
      `${battleName} ${dayjs(eventStartDate).format("MM-DD-YYYY")}`
    );

    const onlineBattle = await db.collection("online_battle").insertOne({
      _id: nanoid(12),
      slug: slugText,
      battleName,
      boardGameName,
      bgImage,
      details,
      eventStartDate,
      eventEndDate,
      createdBy,
      status,
      createdAt: new Date(),
    });

    return getSuccessResponse({
      message: "Online Battle created",
      data: {
        onlineBattle: onlineBattle.ops[0],
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/onlineBattle.js");
  }
}

export async function insertValidEntry(
  db,
  { userId, battleId, score, message, googleLink, verifiedStatus }
) {
  try {
    const entry = await db.collection("user_ob_entry").insertOne({
      _id: nanoid(12),
      userId,
      battleId,
      score,
      message,
      googleLink,
      verifiedStatus,
      createdAt: new Date(),
    });

    return getSuccessResponse({
      message: "User submitted an entry",
      data: {
        entry: entry.ops[0],
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/onlineBattle.js");
  }
}

export const getBattles = async (db, { first, offset }) => {
  try {
    let battles = null;
    first = first ? parseInt(first) : null;
    offset = offset ? parseInt(offset) : 0;

    const lookup = {
      $lookup: {
        from: "users",
        let: { createdBy: "$createdBy" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$$createdBy", "$_id"] }],
              },
            },
          },
          { $project: { password: 0 } },
        ],
        as: "userData",
      },
    };

    let totalOnlineBattlesCount = 0;

    if (first) {
      battles = await db
        .collection("online_battle")
        .aggregate([
          { $sort: { createdAt: -1 } },
          { $skip: offset },
          { $limit: first },
          lookup,
        ]);

      const totalOnlineBattles = await db.collection("online_battle");

      totalOnlineBattlesCount = await totalOnlineBattles.count();
    } else {
      battles = await db
        .collection("online_battle")
        .aggregate([{ $sort: { createdAt: -1 } }, lookup]);
    }

    const allBattles = await battles.toArray();

    const battleCount = allBattles.length;

    return getSuccessResponse({
      message:
        battleCount === 1
          ? "1 Online Battle retrieved"
          : battleCount > 1
          ? `${battleCount} Online Battle retrieved`
          : `Online Battleretrieved`,
      data: {
        battles: allBattles,
        totalOnlineBattlesCount,
        hasMore: first + offset < totalOnlineBattlesCount,
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/onlineBattle.js");
  }
};

export const filterOnlineBattles = async (db, { first, filter, field }) => {
  try {
    let onlineBattles = null;
    first = first ? parseInt(first) : null;

    const lookup = {
      $lookup: {
        from: "users",
        let: { createdBy: "$createdBy" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$$createdBy", "$_id"] }],
              },
            },
          },
          { $project: { password: 0 } },
        ],
        as: "userData",
      },
    };

    if (filter && field) {
      let aggregate = [
        {
          $match: {
            [filter]: field,
          },
        },
        lookup,
        {
          $project: { password: 0 },
        },
      ];

      if (first) {
        //with limit
        aggregate.push({ $limit: first });
      }

      onlineBattles = await db.collection("online_battle").aggregate(aggregate);
    }

    const onlineBattleArray = await onlineBattles.toArray();

    return getSuccessResponse({
      message: "Filtered Online Battle",
      data: {
        onlineBattles: onlineBattleArray,
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/user.js", "Filter Online Battle error");
  }
};
