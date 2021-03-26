import { nanoid } from "nanoid";
import { getFailedResponse, getSuccessResponse } from "~/util/apiResponse";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

export async function insertUser(
  db,
  { firstName, lastName, email, password, role = "guest", username }
) {
  try {
    const checkUser = await db.collection("users").findOne({ email: email });

    if (checkUser) {
      return getFailedResponse("error", "db/user.js", "Email already exists");
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

export async function authenticateUser(db, { email, password }) {
  try {
    const user = await db.collection("users").findOne({ email: email });

    if (!user) {
      return getFailedResponse("error", "db/user.js", "Email is wrong");
    }

    if (user) {
      const userId = user._id,
        userEmail = user.email,
        userPassword = user.password;

      const compare = await bcrypt.compare(password, userPassword);

      if (compare) {
        //JWT Payload
        const payload = {
          id: userId,
          email: userEmail,
        };

        // Sign token
        const jwtToken = await jwt.sign(payload, process.env.TOKEN_SECRET, {
          expiresIn: 900, // 15 minutes in seconds
        });

        return getSuccessResponse({
          message: "Login Successful",
          data: {
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
