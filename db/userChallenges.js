import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export const insertUserChallenges = async (
  db,
  { userId, challengeId, powerups }
) => {
  try {
    const user = await db.collection("users");
    const challenge = await db.collection("user_challenges");

    const challengeIdCount = await challenge
      .find({
        userId,
        challengeId,
      })
      .count();

    // Check if challengeId is exist
    if (challengeIdCount === 0) {
      // if not insert userId and ChallengeId
      const achieveChallenge = await challenge.insertOne({
        userId,
        challengeId,
      });

      await user.findOneAndUpdate({ _id: userId }, { $inc: { powerups } });
      const userWithPowerUps = await user.findOne(
        { _id: userId },
        { projection: { password: 0 } }
      );

      return getSuccessResponse({
        message: "User achieves a challenge",
        data: {
          challenge: achieveChallenge.ops[0],
          userWithPowerUps: userWithPowerUps,
        },
      });
    } else {
      const userWithPowerUps = await user.findOne(
        { _id: userId },
        { projection: { password: 0 } }
      );

      return getSuccessResponse({
        message: "User has achieved this challenge",
        data: {
          userWithPowerUps: userWithPowerUps,
        },
      });
    }
  } catch (err) {
    return getFailedResponse(err, "db/userChallenges.js");
  }
};

export const filterUserChallenges = async (db, { first, filter, field }) => {
  try {
    let challenges = null;
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

      challenges = await db.collection("user_challenges").aggregate(aggregate);
    }

    const userChallengesArray = await challenges.toArray();

    return getSuccessResponse({
      message: "Filtered User Challenges",
      data: {
        challenge: userChallengesArray,
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/user.js", "Filter User Challenges error");
  }
};
