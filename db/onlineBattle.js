import { nanoid } from "nanoid";
import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export async function insertBattle(
  db,
  { battleName, boardGameName, bgId, details, eventStartDate, eventEndDate }
) {
  try {
    const onlineBattle = await db.collection("online_battle").insertOne({
      _id: nanoid(12),
      battleName,
      boardGameName,
      bgId,
      details,
      eventStartDate,
      eventEndDate,
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
