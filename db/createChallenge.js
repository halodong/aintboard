import { nanoid } from "nanoid";
import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export const createChallenge = async (
  db,
  { challengeName, bgId, bgName, bgYear, powerUpAmount }
) => {
  try {
    const challenge = await db.collection("create_challenge").insertOne({
      _id: nanoid(12),
      challengeName,
      bgId,
      bgName,
      bgYear,
      powerUpAmount,
      createdAt: new Date(),
    });

    return getSuccessResponse({
      message: "Challenge created",
      data: {
        challenge: challenge.ops[0],
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/createChallenge.js");
  }
};
