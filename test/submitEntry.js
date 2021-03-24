let chai = require("chai");
let chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);

let expect = chai.expect;

describe("Submit Valid Entry /POST /api/online-battles/entry", () => {
  it("A user should submit a valid entry", (done) => {
    chai
      .request(process.env.LOCAL_URL)
      .post("/api/online-battles/entry")
      .send({
        battleId: 123,
        score: 456,
        message: "Successfully Joined!",
        googleLink: "https://battles.com",
        verifiedStatus: "approved",
      })
      .end((err, res) => {
        if (err) done();
        expect(res.status).to.equal(200);
        expect(res.body.entry.battleId).to.equal(123);
        expect(res.body.entry.score).to.equal(456);
        expect(res.body.entry.message).to.equal("Successfully Joined!");
        expect(res.body.entry.googleLink).to.equal("https://battles.com");
        expect(res.body.entry.verifiedStatus).to.equal("approved");
        done();
      });
  });
});
