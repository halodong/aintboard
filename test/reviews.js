let chai = require("chai");
let chaiHttp = require("chai-http");

chai.use(chaiHttp);

let expect = chai.expect;

describe("Reviews", () => {
  describe("/POST reviews", () => {
    it("it should make a new review", (done) => {
      chai
        .request("http://localhost:3002")
        .post("/api/reviews")
        .send({
          userId: 1,
          bgId: 121,
          reviewText: "3123123",
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.review.reviewText).to.equal("3123123");
          done();
        });
    });
  });
});
