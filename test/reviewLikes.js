let chai = require("chai");
let chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);

let expect = chai.expect;

describe("Reviews", () => {
  describe("/POST /api/review/like", () => {
    it("it should like a review and should add a star on every 10 likes on reviews", (done) => {
      chai
        .request(process.env.LOCAL_URL)
        .post("/api/review/like")
        .send({
          userId: 1,
          reviewId: 1,
        })
        .end((err, res) => {
          if (err) done();

          const totalLikes = res.body.reviewLike.response.totalLikes;
          expect(res.status).to.equal(200);
          expect(res.body.reviewLike.success).to.equal(true);
          expect(totalLikes).to.be.a("number");

          if (totalLikes % 10 === 0) {
            // eslint-disable-next-line no-unused-expressions
            expect(res.body.reviewLike.response.message).to.exist;
          }
          done();
        });
    });
  });
});
