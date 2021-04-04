import { insertReview, getReviews, filterReviews } from "../db/reviews";
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

    const count = res.response.data.reviews.length;

    const message =
      count === 1
        ? "1 Review retrieved"
        : count > 1
        ? `${count} Reviews retrieved`
        : `No Reviews retrieved`;

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal(message);
    expect(res.response.data.reviews).to.be.an("array");
  });

  it("should get first reviews", async () => {
    let res = await getReviews(db, { first: 1 });

    expect(res.success).to.equal(true);

    const count = res.response.data.reviews.length;

    const message =
      count === 1
        ? "1 Review retrieved"
        : count > 1
        ? `${count} Reviews retrieved`
        : `No Reviews retrieved`;

    expect(res.response.message).to.equal(message);
    expect(res.response.data.reviews).to.be.an("array");
  });

  it("should get first 2 reviews", async () => {
    let res = await getReviews(db, { first: 2 });

    expect(res.success).to.equal(true);

    const count = res.response.data.reviews.length;

    const message =
      count === 1
        ? "1 Review retrieved"
        : count > 1
        ? `${count} Reviews retrieved`
        : `No Reviews retrieved`;

    expect(res.response.message).to.equal(message);
    expect(res.response.data.reviews).to.be.an("array");
  });

  it("should get reviews with bgId: 121 with first param", async () => {
    let res = await filterReviews(db, { first: 4, filter: "bgId", field: 121 });

    expect(res.success).to.equal(true);
    expect(res.response.data.reviews).to.be.an("array");
  });

  it("should get reviews with bgId: 121 without first param", async () => {
    let res = await filterReviews(db, { filter: "bgId", field: 121 });

    expect(res.success).to.equal(true);
    expect(res.response.data.reviews).to.be.an("array");
  });
});
