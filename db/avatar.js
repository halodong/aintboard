import { nanoid } from "nanoid";
import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export const buyAvatar = async (db, { userId, icon, powerups }) => {
  try {
    const userAvatar = await db.collection("user_avatars").insertOne({
      _id: nanoid(12),
      userId,
      icon,
      createdAt: new Date(),
    });

    const negativePowerups = powerups * -1; //used to subtract powerups
    const user = await db.collection("users");
    await user.findOneAndUpdate(
      { _id: userId },
      { $inc: { powerups: negativePowerups } }
    );
    const userWithPowerUps = await user.findOne(
      { _id: userId },
      { projection: { password: 0 } }
    );

    return getSuccessResponse({
      message: "User has bought an avatar successfully",
      data: {
        userAvatar: userAvatar.ops[0],
        userWithPowerUps,
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/avatar.js", "Cannot buy an avatar");
  }
};

export const getUserAvatars = async (db, { userId }) => {
  try {
    const userAvatars = await db.collection("user_avatars").find({ userId });
    const userAvatarsArray = await userAvatars.toArray();

    return getSuccessResponse({
      message: "User avatars retrieved",
      data: {
        userAvatars: userAvatarsArray,
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/avatar.js", "Cannot get user avatars");
  }
};
