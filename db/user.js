import { nanoid } from "nanoid";
import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

export async function insertUser(
  db,
  { firstName, lastName, email, password, role = "guest", username, avatar }
) {
  try {
    const checkEmail = await db.collection("users").findOne({ email });

    if (checkEmail) {
      return getFailedResponse("error", "db/user.js", "Email already exists");
    }

    const checkUsername = await db.collection("users").findOne({ username });

    if (checkUsername) {
      return getFailedResponse(
        "error",
        "db/user.js",
        "Username already exists"
      );
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await db.collection("users").insertOne({
      _id: nanoid(12),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      username,
      avatar,
      powerups: 0,
      stars: 0,
    });

    return getSuccessResponse({
      message: "User created",
      data: {
        user: user.ops[0],
      },
    });
  } catch (err) {
    return getFailedResponse(err, "db/user.js", "User creation failed");
  }
}

export async function authenticateUser(db, { email, username, password }) {
  try {
    const user = await db
      .collection("users")
      .findOne({ $or: [{ email }, { username }] });

    if (!user) {
      return getFailedResponse("error", "db/user.js", "Email is wrong");
    }

    if (user) {
      const userId = user._id,
        userPassword = user.password;

      const compare = await bcrypt.compare(password, userPassword);

      if (compare) {
        //JWT Payload
        const payload = {
          id: userId,
        };

        // Sign token
        const jwtToken = await jwt.sign(payload, process.env.TOKEN_SECRET, {
          expiresIn: process.env.TOKEN_EXPIRY,
        });

        delete user.password;

        return getSuccessResponse({
          message: "Login Successful",
          data: {
            user: user,
            token: jwtToken,
          },
        });
      } else {
        return getFailedResponse("error", "db/user.js", "Password incorrect");
      }
    }
  } catch (err) {
    return getFailedResponse(err, "db/user.js", "User retrieval failed");
  }
}
