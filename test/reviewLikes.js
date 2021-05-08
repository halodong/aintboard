import { likeReview, getLikes } from "../db/reviewLikes";
import { insertUser } from "../db/user";
import { nanoid } from "nanoid";
const chai = require("chai");
const expect = chai.expect;
const dbHandler = require("./db-handler");

describe("Review Likes", () => {
  let db, user;
  before(async () => {
    try {
      db = await dbHandler.connect();
      await dbHandler.clearDatabase();
    } catch (e) {
      throw e;
    }

    let userData = await insertUser(db, {
      _id: nanoid(12),
      firstName: "faith",
      lastName: "test",
      email: "faith.morante@aintboard.app",
      password: "1234",
      role: "guest",
      username: "faithm",
    });

    user = userData.response.data.user;
  });

  after(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
  });

  it("should like a review", async () => {
    let res = await likeReview(db, {
      userId: user._id,
      reviewId: 1,
    });

    const totalLikes = res.response.totalLikes;

    expect(res.success).to.equal(true);
    expect(totalLikes).to.be.a("number");
    expect(totalLikes).to.be.equal(1);
  });

  it("should like a review and should add a star on every 10 likes on reviews", async () => {
    let res;

    for (let i = 0; i < 10; i++) {
      res = await likeReview(db, {
        userId: user._id,
        reviewId: 1,
      });
    }

    const totalLikes = res.response.totalLikes;

    expect(res.success).to.equal(true);
    expect(totalLikes).to.be.a("number");

    if (totalLikes % 10 === 0) {
      expect(res.response.message).to.exist;
      expect(totalLikes).to.be.equal(10);
    }
  });

  it("should get total likes count", async () => {
    let res = await getLikes(db, { reviewId: 1 });

    expect(res.success).to.equal(true);
    expect(res.response.totalLikes).to.be.a("number");
    expect(res.response.totalLikes).to.be.equal(11);
  });
});
