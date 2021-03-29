import { insertChampion } from "../db/champion";
import { nanoid } from "nanoid";
const dbHandler = require("./db-handler");
const chai = require("chai");
const expect = chai.expect;

describe("Champions", () => {
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

  it("should add a champion", async () => {
    let res = await insertChampion(db, {
      userId: 987,
      trophyType: "gold",
      battleId: 45679,
    });

    expect(res.success).to.equal(true);
    expect(res.response.data.userTrophy.userId).to.equal(987);
    expect(res.response.data.userTrophy.trophyType).to.equal("gold");
    expect(res.response.data.userTrophy.battleId).to.equal(45679);
  });
});
