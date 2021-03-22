let chai = require("chai");
let chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);

let expect = chai.expect;

describe("Review Comments", () => {
  describe("/POST /api/review/comment", () => {
    it("it should comment a review", (done) => {
      chai
        .request(process.env.LOCAL_URL)
        .post("/api/review/comment")
        .send({
          userId: 1,
          reviewId: 1,
          comment: "This is a comment",
        })
        .end((err, res) => {
          if (err) done();

          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.response.data.comment.comment).to.equal(
            "This is a comment"
          );

          done();
        });
    });
  });
});
