let chai = require("chai");
let chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);

let expect = chai.expect;

describe("Insert user challenges", () => {
  describe("/POST /api/user-challenges", () => {
    it("it should be able to achieve a challenge", (done) => {
      const userId = "XDSCA_14NyvN";
      const challengeId = 10;
      const powerups = 4;
      chai
        .request(process.env.LOCAL_URL)
        .post(
          `/api/user-challenges?userId=${userId}&challengeId=${challengeId}&powerups=${powerups}`
        )
        .send()
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
            expect(res.body.response.data.totalPowerups).to.be.a("number");
          }

          const alreadyAchieveChallenge = res.body.response.message;

          if (
            alreadyAchieveChallenge ===
            '"Already succeed in achieving this challenge"'
          ) {
            expect(res.body.response.data.totalPowerups).to.be.a("number");
          }
        });

      done();
    });
  });
});
