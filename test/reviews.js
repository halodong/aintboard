import {
  insertReview,
  getReviews,
  filterReviews,
  reviewStatus,
  deleteReview,
} from "../db/reviews";

const chai = require("chai");
const expect = chai.expect;
const dbHandler = require("./db-handler");

const REVIEW_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

const REVIEW_TYPE = {
  REVIEW: "REVIEW",
  STRATEGY: "STRATEGY",
};

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
      username: "faithm",
      bgName: "Brass Lanc",
      title: "I love this game!",
      content: "3123123",
      reviewStatus: REVIEW_STATUS.PENDING,
      reviewType: REVIEW_TYPE.REVIEW,
    });

    expect(res.success).to.equal(true);
    expect(res.response.data.review.userId).to.equal(1);
    expect(res.response.data.review.bgName).to.equal("Brass Lanc");
    expect(res.response.data.review.slug).to.equal("i-love-this-game-faithm");
    expect(res.response.data.review.content).to.equal("3123123");
    expect(res.response.data.review.reviewStatus).to.equal(
      REVIEW_STATUS.PENDING
    );
    expect(res.response.data.review.reviewType).to.equal(REVIEW_TYPE.REVIEW);
  });

  it("should make a new strategy", async () => {
    let res = await insertReview(db, {
      _id: "123",
      userId: 1,
      username: "faithm",
      bgName: "Brass Lanc",
      title: "I love this game!",
      content: "3123123",
      reviewStatus: REVIEW_STATUS.PENDING,
      reviewType: REVIEW_TYPE.STRATEGY,
    });

    expect(res.success).to.equal(true);
    expect(res.response.data.review.userId).to.equal(1);
    expect(res.response.data.review.bgName).to.equal("Brass Lanc");
    expect(res.response.data.review.slug).to.equal("i-love-this-game-faithm");
    expect(res.response.data.review.content).to.equal("3123123");
    expect(res.response.data.review.reviewStatus).to.equal(
      REVIEW_STATUS.PENDING
    );
    expect(res.response.data.review.reviewType).to.equal(REVIEW_TYPE.STRATEGY);
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

  it("should get reviews with bgName: Brass Lanc with first param", async () => {
    let res = await filterReviews(db, {
      first: 4,
      filter: "bgName",
      field: "Brass Lanc",
    });

    expect(res.success).to.equal(true);
    expect(res.response.data.reviews).to.be.an("array");
    expect(res.response.data.reviews.map((e) => e.bgName)).to.include(
      "Brass Lanc"
    );
  });

  it("should get reviews with bgName: Brass Lanc without first param", async () => {
    let res = await filterReviews(db, {
      filter: "bgName",
      field: "Brass Lanc",
    });

    expect(res.success).to.equal(true);
    expect(res.response.data.reviews).to.be.an("array");
    expect(res.response.data.reviews.map((e) => e.bgName)).to.include(
      "Brass Lanc"
    );
  });

  it("should update PENDING review to APPROVED of REJECTED", async () => {
    let res = await reviewStatus(db, {
      id: "123",
      status: REVIEW_STATUS.APPROVED,
    });

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal("Review Updated");
  });

  it("should delete the review", async () => {
    let res = await deleteReview(db, { id: "123" });

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal("Review Deleted");
  });
});
