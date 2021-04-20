import { nanoid } from "nanoid";

import { buyAvatar } from "../db/avatar";
import { insertUser } from "../db/user";
import { insertUserChallenges } from "../db/userChallenges";

const chai = require("chai");
const expect = chai.expect;
const dbHandler = require("./db-handler");

describe("Avatar routes", () => {
  let db, user;
  before(async () => {
    try {
      db = await dbHandler.connect();
      await dbHandler.clearDatabase();

      let userRes = await insertUser(db, {
        _id: nanoid(12),
        firstNam: "faith",
        lastName: "test",
        email: "faith.morante@aintboard.app",
        password: "1234",
        role: "guest",
        username: "faithm",
      });

      user = userRes.response.data.user;

      //simulate achieving a challenge
      await insertUserChallenges(db, {
        userId: user._id,
        challengeId: 2,
        powerups: 10,
      });
    } catch (e) {
      throw e;
    }
  });

  after(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
  });

  it("should buy an avatar", async () => {
    let res = await buyAvatar(db, {
      userId: user._id,
      icon: "DRAGON",
      powerups: 4,
    });

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal(
      "User has bought an avatar successfully"
    );
    expect(res.response.data.userAvatar.icon).to.equal("DRAGON");
    expect(res.response.data.userWithPowerUps.powerups).to.equal(6);
  });
});
