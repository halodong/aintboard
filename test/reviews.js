import { insertReview } from "../db/reviews";
const chai = require("chai");
const expect = chai.expect;
const dbHandler = require("./db-handler");

describe("Reviews", () => {
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

  it("should make a new review", async () => {
    let res = await insertReview(db, {
      userId: 1,
      bgId: 121,
      reviewText: "3123123",
      reviewStatusId: 1,
      reviewType: "review",
    });

    expect(res.success).to.equal(true);
    expect(res.response.data.review.userId).to.equal(1);
    expect(res.response.data.review.bgId).to.equal(121);
    expect(res.response.data.review.reviewText).to.equal("3123123");
    expect(res.response.data.review.reviewStatusId).to.equal(1);
    expect(res.response.data.review.reviewType).to.equal("review");
  });

  it("should make a new strategy", async () => {
    let res = await insertReview(db, {
      userId: 1,
      bgId: 121,
      reviewText: "3123123",
      reviewStatusId: 1,
      reviewType: "strategy",
    });

    expect(res.success).to.equal(true);
    expect(res.response.data.review.userId).to.equal(1);
    expect(res.response.data.review.bgId).to.equal(121);
    expect(res.response.data.review.reviewText).to.equal("3123123");
    expect(res.response.data.review.reviewStatusId).to.equal(1);
    expect(res.response.data.review.reviewType).to.equal("strategy");
  });
});
