import { nanoid } from "nanoid";
import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export const insertChallenge = async (
  db,
  {
    createdBy,
    challengeName,
    bgId,
    bgName,
    bgYear,
    bgImage,
    powerUpAmount,
    status,
  }
) => {
  try {
    const challenge = await db.collection("challenges").insertOne({
      _id: nanoid(12),
      createdBy,
      challengeName,
      bgId,
      bgName,
      bgImage,
      bgYear,
      powerUpAmount,
      status,
      createdAt: new Date(),
    });

    return getSuccessResponse({
      message: "Challenge created",
      data: {
        challenge: challenge.ops[0],
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/challenges.js");
  }
};

export const getAllChallenges = async (db, { first }) => {
  try {
    let challenges = null;
    first = first ? parseInt(first) : null;

    if (first) {
      challenges = await db
        .collection("challenges")
        .aggregate([{ $limit: first }]);
    } else {
      challenges = await db.collection("challenges").find();
    }

    const allChallenge = await challenges.toArray();

    const challengeCount = allChallenge.length;

    return getSuccessResponse({
      message:
        challengeCount === 1
          ? "1 Challenge retrieved"
          : challengeCount > 1
          ? `${challengeCount} Challenges retrieved`
          : `No Challenges retrieved`,
      data: {
        challenges: allChallenge,
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/challenges.js");
  }
};

export const filterChallenges = async (db, { filter, field, first }) => {
  try {
    let challenges = null;
    first = first ? parseInt(first) : null;

    if (filter && field) {
      field = ["bgId", "bgYear", "powerUpAmount"].includes(filter)
        ? parseInt(field)
        : field;

      let aggregate = [
        {
          $match: {
            [filter]: field,
          },
        },
      ];

      if (first) {
        //with limit
        aggregate.push({ $limit: first });
      }

      challenges = await db.collection("challenges").aggregate(aggregate);
    }

    const filteredChallenges = await challenges.toArray();

    return getSuccessResponse({
      message: "Filtered Challenges",
      data: {
        challenges: filteredChallenges,
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/challenges.js");
  }
};
