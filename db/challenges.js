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

export const getAllChallenges = async (
  db,
  { first, offset, approved = null }
) => {
  try {
    let challenges = null;
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

    let totalChallengesCount = 0;
    let aggregate = [];

    if (first) {
      aggregate = [
        { $sort: { createdAt: -1 } },
        { $skip: offset },
        { $limit: first },
        lookup,
      ];

      const totalChallenges = await db.collection("challenges");

      totalChallengesCount = await totalChallenges.count();
    } else {
      aggregate = [{ $sort: { createdAt: -1 } }, lookup];
    }

    // default - get all data regardless of status
    let match = {
      $match: {
        status: { $in: ["APPROVED", "PENDING", "REJECTED"] },
      },
    };

    if (approved === "true") {
      match = { $match: { status: "APPROVED" } };
    }

    aggregate.push(match);

    challenges = await db.collection("challenges").aggregate(aggregate);

    const challengeArray = await challenges.toArray();
    const challengesCount = challengeArray.length;

    return getSuccessResponse({
      message:
        challengesCount === 1
          ? "1 Challenge retrieved"
          : challengesCount > 1
          ? `${challengesCount} Challenges retrieved`
          : "No Challenges retrieved",
      data: {
        challenges: challengeArray,
        totalChallengesCount,
        hasMore: first + offset < totalChallengesCount,
      },
    });
  } catch (err) {
    return getFailedResponse(
      err,
      "db/challenges.js",
      "Couldn't get challenges"
    );
  }
};

export const filterChallenges = async (
  db,
  { filter, field, first, approved = null }
) => {
  try {
    let challenges = null;
    first = first ? parseInt(first) : null;

    if (filter && field) {
      field = ["bgId", "bgYear"].includes(filter) ? parseInt(field) : field;

      // default - get all data regardless of status
      let match = {
        $match: {
          [filter]: field,
          status: { $in: ["APPROVED", "PENDING", "REJECTED"] },
        },
      };

      if (approved === "true") {
        match = { $match: { [filter]: field, status: "APPROVED" } };
      }

      let aggregate = [match];

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

export const challengeStatus = async (db, { status, id }) => {
  try {
    await db
      .collection("challenges")
      .updateOne({ _id: id }, { $set: { status } });

    return getSuccessResponse({
      message: "Challenge Updated",
    });
  } catch (err) {
    return getFailedResponse(
      err,
      "db/challenges.js",
      "Challenge Failed to update"
    );
  }
};

export const deleteChallenge = async (db, { id }) => {
  try {
    await db.collection("challenges").deleteOne({ _id: id });

    return getSuccessResponse({
      message: "Challenge Deleted",
    });
  } catch (err) {
    return getFailedResponse(
      err,
      "db/.challenges.js",
      "Challenge Failed to delete"
    );
  }
};
