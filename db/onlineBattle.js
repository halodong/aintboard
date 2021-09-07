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

export const getBattles = async (db, { first, offset, approved = null }) => {
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
    let aggregate = [];

    if (first) {
      aggregate = [
        { $sort: { createdAt: -1 } },
        { $skip: offset },
        { $limit: first },
        lookup,
      ];
      const totalOnlineBattles = await db.collection("online_battle");
      totalOnlineBattlesCount = await totalOnlineBattles.countDocuments();
    } else {
      aggregate = [{ $sort: { createdAt: -1 } }, lookup];
    }

    let match = {
      $match: { status: { $in: ["APPROVED", "PENDING", "REJECTED"] } },
    };

    if (approved === "true") {
      match = {
        $match: {
          status: "APPROVED",
        },
      };
    }

    aggregate.push(match);
    battles = await db.collection("online_battle").aggregate(aggregate);

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
            : new RegExp(field, "i"),
        },
      },
      lookup,
      {
        $project: { password: 0 },
      },
    ];

    if (first) {
      //with limit
      aggregate.push(
        { $sort: { createdAt: -1 } },
        { $skip: offset },
        { $limit: first }
      );
    }

    if (filter && field) {
      onlineBattles = await db.collection("online_battle").aggregate(aggregate);
    }

    const onlineBattleArray = await onlineBattles.toArray();

    let count = onlineBattleArray.length;

    return getSuccessResponse({
      message: "Filtered Online Battle",
      data: {
        onlineBattles: onlineBattleArray,
        totalOnlineBattlesCount: count,
        hasMore: first + offset < count,
      },
    });
  } catch (err) {
    return getFailedResponse(
      err,
      "db/onlineBattle.js",
      "Filter Online Battle error"
    );
  }
};

export const OnlineBattleStatus = async (db, { status, id }) => {
  try {
    await db
      .collection("online_battle")
      .updateOne({ _id: id }, { $set: { status: status } });

    return getSuccessResponse({
      message: "OnlineBattle Updated",
    });
  } catch (err) {
    return getFailedResponse(
      err,
      "db/onlineBattle.js",
      "Filter OnlineBattle error"
    );
  }
};

export const deleteOnlineBattle = async (db, { id }) => {
  try {
    await db.collection("online_battle").deleteOne({ _id: id });

    return getSuccessResponse({
      message: "OnlineBattle Deleted",
    });
  } catch (err) {
    return getFailedResponse(
      err,
      "db/onlineBattle.js",
      "Filter OnlineBattle error"
    );
  }
};
