import { insertFollowBg } from "../db/followBg";
const chai = require("chai");
const expect = chai.expect;
const dbHandler = require("./db-handler");

describe("Follow Boardgame", () => {
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

  it("User should follow a board game", async () => {
    let res = await insertFollowBg(db, {
      userId: 12,
      bgId: 467,
    });

    expect(res.success).to.equal(true);
    expect(res.response.data.followBg.userId).to.equal(12);
    expect(res.response.data.followBg.bgId).to.equal(467);
  });
});
