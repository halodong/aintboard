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
        onlineBattles: allBattles,
        totalOnlineBattlesCount,
        hasMore: first + offset < totalOnlineBattlesCount,
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/onlineBattle.js");
  }
};

export const filterOnlineBattles = async (
  db,
  { first, filter, field, offset }
) => {
  try {
    let onlineBattles = null;
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

    let fieldType = dayjs(field);
    if (filter === "slug") fieldType = dayjs("slug");

    let aggregate = [
      {
        $match: {
          // Check if field is a valid date
          // if true filter the date
          // if false just the field
          [filter]: fieldType.isValid()
            ? {
                $gte: fieldType.toISOString(),
                $lte: fieldType.add(1, "d").toISOString(),
              }
            : field,
        },
      },
      lookup,
      {
        $project: { password: 0 },
      },
    ];

    let count = [
      ...aggregate,
      {
        $group: {
          _id: `$${filter}`,
          count: {
            $sum: 1,
          },
        },
      },
      {
        $count: "count",
      },
    ];

    if (filter && field) {
      onlineBattles = await db.collection("online_battle").aggregate([
        {
          $facet: {
            battles: aggregate,
            count,
          },
        },
      ]);
    }

    if (first) {
      //with limit
      aggregate.push(
        { $sort: { createdAt: -1 } },
        { $skip: offset },
        { $limit: first }
      );
    }

    const onlineBattleArray = await onlineBattles.toArray();
    count =
      filter === "createdBy"
        ? await db
            .collection("online_battle")
            .find({ createdBy: field })
            .count()
        : onlineBattleArray[0].count[0].count;

    return getSuccessResponse({
      message: "Filtered Online Battle",
      data: {
        onlineBattles: onlineBattleArray,
        count,
        hasMore: first + offset < count,
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/user.js", "Filter Online Battle error");
  }
};
