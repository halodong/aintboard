import { insertUserChallenges } from "../db/userChallenges";
import { insertUser } from "../db/user";
import { nanoid } from "nanoid";
let chai = require("chai");
let expect = chai.expect;
const dbHandler = require("./db-handler");

describe("User challenges", () => {
  let user;
  let db;
  before(async () => {
    try {
      db = await dbHandler.connect();
      await dbHandler.clearDatabase();
    } catch (e) {
      throw e;
    }

    user = await insertUser(db, {
      _id: nanoid(12),
      firstNam: "faith",
      lastName: "test",
      email: "faith.morante@aintboard.app",
      password: "1234",
      role: "guest",
      username: "faithm",
    });
  });

  after(async () => {
    await dbHandler.closeDatabase();
  });

  it("should be able to achieve a challenge", async () => {
    let res = await insertUserChallenges(db, {
      userId: user._id,
      challengeId: 2,
      powerups: 4,
    });

    const achieveChallenge = res.response.message;

    if (achieveChallenge === "User achieves a challenge") {
      expect(res.response.data.challenge).to.include.all.keys(
        "userId",
        "challengeId",
        "_id"
      );
      expect(res.response.data.userWithPowerUps).to.be.an("object");
    }

    const alreadyAchieveChallenge = res.response.message;

    if (alreadyAchieveChallenge === "User has achieved this challenge") {
      expect(res.response.data.userWithPowerUps).to.be.an("object");
    }
  });
});
