let chai = require("chai");
let chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);

let expect = chai.expect;

describe("Insert user challenges", () => {
  describe("/POST /api/user/challenge", () => {
    it("it should be able to achieve a challenge", (done) => {
      chai
        .request(process.env.LOCAL_URL)
        .post("/api/user/challenge")
        .send({
          userId: "XDSCA_14NyvN",
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
            expect(res.body.response.data.userWithPowerUps).to.be.a("number");
          }

          const alreadyAchieveChallenge = res.body.response.message;

          if (alreadyAchieveChallenge === "User has achieved this challenge") {
            expect(res.body.response.data.userWithPowerUps).to.be.a("number");
          }
        });

      done();
    });
  });
});
