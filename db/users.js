import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

export async function getUsers(db, { first }) {
  try {
    let users = null;
    first = first ? parseInt(first) : null;

    if (first) {
      users = await db.collection("users").aggregate([{ $limit: first }]);
    } else {
      users = await db.collection("users").find();
    }
    const usersArray = await users.toArray();

    const usersCount = usersArray.length;

    return getSuccessResponse({
      message:
        usersCount === 1
          ? "1 User retrieved"
          : usersCount > 1
          ? `${usersCount} Users retrieved`
          : `No Users retrieved`,
      data: {
        users: usersArray,
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/users.js", "Couldn't get users");
  }
}

export const deleteUser = async (db, { id }) => {
  try {
    await db.collection("users").deleteOne({ _id: id });

    return getSuccessResponse({
      message: "User Deleted",
    });
  } catch (err) {
    return getFailedResponse(err, "db/users.js", "Couldn't delete user");
  }
};
