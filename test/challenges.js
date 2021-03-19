let chai = require("chai");
let chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);

let expect = chai.expect;

describe("Create Challenge", () => {
  describe("/POST /api/challenges", () => {
    it("it should create a challenge", (done) => {
      chai
        .request(process.env.LOCAL_URL)
        .post("/api/challenges")
        .send({
          challengeName: "Score 170 VP in a 4-Player match in Brass Lancashire",
          bgId: 1,
          bgName: "Glendell",
          bgYear: "2021",
          powerUpAmount: 2,
        })
        .end((err, res) => {
          if (err) done();
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.response.message).to.equal("Challenge created");
        });

      done();
    });
  });
});
