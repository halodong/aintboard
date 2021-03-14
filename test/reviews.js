let chai = require("chai");
let chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);

let expect = chai.expect;

describe("Reviews", () => {
  describe("/POST reviews", () => {
    it("it should make a new review", (done) => {
      chai
        .request(process.env.LOCAL_URL)
        .post("/api/reviews")
        .send({
          userId: 1,
          bgId: 121,
          reviewText: "3123123",
          reviewStatusId: 1,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.review.reviewText).to.equal("3123123");
          expect(res.body.review.reviewStatusId).to.equal(1);
          done();
        });
    });
  });
});
