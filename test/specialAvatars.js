import { getSpecialAvatars, insertSpecialAvatar } from "../db/specialAvatars";

const chai = require("chai");
const expect = chai.expect;
const dbHandler = require("./db-handler");

describe("Special Avatars routes", () => {
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

  it("should insert a special avatar", async () => {
    let res = await insertSpecialAvatar(db, {
      createdBy: "admin",
      icon: "WITCHER",
      powerUpAmount: 20,
    });

    expect(res.success).to.equal(true);
    expect(res.response.data.avatar.powerUpAmount).to.equal(20);
  });

  it("should get all special avatars", async () => {
    let res = await getSpecialAvatars(db);

    expect(res.success).to.equal(true);
    expect(res.response.data.avatars.map((e) => e.powerUpAmount)).to.include(
      20
    );
  });
});
