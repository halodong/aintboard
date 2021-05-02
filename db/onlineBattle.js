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

export const getBattles = async (db, { first }) => {
  try {
    let battles = null;
    first = first ? parseInt(first) : null;

    if (first) {
      battles = await db
        .collection("online_battle")
        .aggregate([{ $limit: first }]);
    } else {
      battles = await db.collection("online_battle").find();
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
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/onlineBattle.js");
  }
};
