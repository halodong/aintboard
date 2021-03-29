import { commentReview } from "../db/reviewComments";
const chai = require("chai");
const expect = chai.expect;
const dbHandler = require("./db-handler");

describe("Review Comments", () => {
  let db;

  before(async () => {
    try {
      db = await dbHandler.connect();
      await dbHandler.clearDatabase();
    } catch (e) {
      throw e;
    }
  });

  after(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
  });

  it("should comment a review", async () => {
    let res = await commentReview(db, {
      userId: 1,
      reviewId: 1,
      comment: "This is a comment",
    });

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal("Comment added");
    expect(res.response.data.comment.userId).to.equal(1);
    expect(res.response.data.comment.reviewId).to.equal(1);
    expect(res.response.data.comment.comment).to.equal("This is a comment");
  });
});
