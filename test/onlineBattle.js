import { insertBattle, insertValidEntry } from "../db/onlineBattle";
import { insertUser } from "../db/user";
import { nanoid } from "nanoid";
const dbHandler = require("./db-handler");
let chai = require("chai");

let expect = chai.expect;

describe("Online Battles", () => {
  let user;
  let db;

  before(async () => {
    try {
      db = await dbHandler.connect();
      await dbHandler.clearDatabase();
    } catch (e) {
      throw e;
    }

    user = await insertUser(db, {
      _id: nanoid(12),
      firstNam: "faith",
      lastName: "test",
      email: "faith.morante@aintboard.app",
      password: "1234",
      role: "guest",
      username: "faithm",
    });
  });

  after(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
  });

  it("should create an online battle", async () => {
    let res = await insertBattle(db, {
      battleName: "Battle of the legends",
      boardGameName: "Boardie",
      bgId: 54321,
      details: "This is a battle for the legends",
      eventStartDate: "4-05-2021",
      eventEndDate: "5-05-2021",
    });

    expect(res.battleName).to.equal("Battle of the legends");
    expect(res.boardGameName).to.equal("Boardie");
    expect(res.bgId).to.equal(54321);
    expect(res.details).to.equal("This is a battle for the legends");
    expect(res.eventStartDate).to.equal("4-05-2021");
    expect(res.eventEndDate).to.equal("5-05-2021");
  });

  it("should submit a valid entry", async () => {
    let res = await insertValidEntry(db, {
      userId: user._id,
      battleId: 123,
      score: 456,
      message: "Successfully Joined!",
      googleLink: "https://battles.com",
      verifiedStatus: "approved",
    });

    expect(res.userId).to.equal(user._id);
    expect(res.battleId).to.equal(123);
    expect(res.score).to.equal(456);
    expect(res.message).to.equal("Successfully Joined!");
    expect(res.googleLink).to.equal("https://battles.com");
    expect(res.verifiedStatus).to.equal("approved");
  });
});
