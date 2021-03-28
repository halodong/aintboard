import { insertChampion } from "../db/champion";
import { nanoid } from "nanoid";
const dbHandler = require("./db-handler");
const chai = require("chai");
const expect = chai.expect;

describe("Champions", () => {
  let champion;
  let db;

  before(async () => {
    try {
      db = await dbHandler.connect();
      await dbHandler.clearDatabase();
    } catch (e) {
      throw e;
    }

    champion = await insertChampion(db, {
      _id: nanoid(12),
      userId: 234,
      trophyType: "Gold",
      battleId: 12345,
    });
  });

  after(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
  });

  it("should add a champion", async () => {
    let res = await insertChampion(db, {
      userId: 987,
      trophyType: "Gold",
      battleId: 45679,
    });

    expect(res.success).to.equal(true);
    expect(res.response.data.champion.userId).to.equal(987);
    expect(res.response.data.chanpion.trophyType).to.equal("Gold");
    expect(res.response.data.champion.battleId).to.equal(45679);
  });
});
