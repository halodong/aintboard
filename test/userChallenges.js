import db from "./db";
import { nanoid } from "nanoid";
let chai = require("chai");
let chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);

let expect = chai.expect;

describe("Insert user challenges", () => {
  let user;
  before(async () => {
    let database = await db();

    try {
      await database.db.dropDatabase();
    } catch (e) {
      throw e;
    }

    let obj = await database.db.collection("users").insertOne({
      _id: nanoid(12),
      firstName: "faith",
      lastName: "test",
      email: "faith.morante@test.com",
      password: "1234",
      username: "faithm",
    });

    user = obj.ops[0];

    database.client.close();
  });

  describe("/POST /api/user/challenge", () => {
    it("it should be able to achieve a challenge", (done) => {
      chai
        .request(process.env.LOCAL_URL)
        .post("/api/user/challenge")
        .send({
          userId: user._id,
          challengeId: 2,
          powerups: 4,
        })
        .end((err, res) => {
          if (err) done();

          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);

          const achieveChallenge = res.body.response.message;

          if (achieveChallenge === "User achieves a challenge") {
            expect(res.body.response.data.challenge).to.include.all.keys(
              "userId",
              "challengeId",
              "_id"
            );
            expect(res.body.response.data.userWithPowerUps).to.be.an("object");
          }

          const alreadyAchieveChallenge = res.body.response.message;

          if (alreadyAchieveChallenge === "User has achieved this challenge") {
            expect(res.body.response.data.userWithPowerUps).to.be.an("object");
          }
        });

      done();
    });
  });
});
