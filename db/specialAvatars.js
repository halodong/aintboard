import { nanoid } from "nanoid";
import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export const getSpecialAvatars = async (db) => {
  try {
    const avatars = await db.collection("special_avatars").find();

    const allAvatars = await avatars.toArray();

    return getSuccessResponse({
      message: "All special avatars retrieved",
      data: {
        avatars: allAvatars,
      },
    });
  } catch (err) {
    return getFailedResponse(
      err,
      "db/specialAvatars.js",
      "Cannot retrieve Special Avatars"
    );
  }
};

export const insertSpecialAvatar = async (
  db,
  { createdBy, icon, powerUpAmount }
) => {
  try {
    const avatar = await db.collection("special_avatars").insertOne({
      _id: nanoid(12),
      createdBy,
      icon,
      powerUpAmount,
      createdAt: new Date(),
    });

    return getSuccessResponse({
      message: "Special Avatar added",
      data: {
        avatar: avatar.ops[0],
      },
    });
  } catch (err) {
    return getFailedResponse(
      err,
      "db/specialAvatars.js",
      "Cannot insert a Special Avatar"
    );
  }
};
