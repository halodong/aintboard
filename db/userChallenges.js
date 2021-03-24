import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export const insertUserChallenges = async (
  db,
  { userId, challengeId, powerups }
) => {
  try {
    const user = await db.collection("users");
    const challenge = await db.collection("user_challenges");

    const exist_challengeId = await challenge
      .find({
        userId,
        challengeId,
      })
      .count();

    // Check if challengeId is exist
    if (exist_challengeId === 0) {
      // if not insert userId and ChallengeId
      const achieveChallenge = await challenge.insertOne({
        userId,
        challengeId,
      });

      await user.findOneAndUpdate({ _id: userId }, { $inc: { powerups } });
      const totalPowerups = await user.findOne({ _id: userId });

      return getSuccessResponse({
        message: "User achieves a challenge",
        data: {
          challenge: achieveChallenge.ops[0],
          totalPowerups: totalPowerups.powerups,
        },
      });
    } else {
      const totalPowerups = await user.findOne({ _id: userId });
      return getSuccessResponse({
        message: "Already succeed in achieving this challenge",
        data: {
          totalPowerups: totalPowerups.powerups,
        },
      });
    }
  } catch (err) {
    return getFailedResponse(err, "db/userChallenges.js");
  }
};
