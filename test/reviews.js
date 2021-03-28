import { insertReview, getReviews } from "../db/reviews";
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

  it("should get all reviews", async () => {
    let res = await getReviews(db, { first: null });

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal("Reviews retrieved");
    expect(res.response.data.reviews).to.be.an("array");
  });

  it("should get first reviews", async () => {
    let res = await getReviews(db, { first: 1 });

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal("1 Review retrieved");
    expect(res.response.data.reviews).to.be.an("array");
    expect(res.response.data.reviews).to.have.length(1);
  });

  it("should get first 2 reviews", async () => {
    let res = await getReviews(db, { first: 2 });

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal("2 Reviews retrieved");
    expect(res.response.data.reviews).to.be.an("array");
    expect(res.response.data.reviews).to.have.length(2);
  });
});
