import {
  insertBattle,
  insertValidEntry,
  getBattles,
  filterOnlineBattles,
} from "../db/onlineBattle";
import { insertUser } from "../db/user";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
const dbHandler = require("./db-handler");
const chai = require("chai");
const expect = chai.expect;

describe("Online Battles", () => {
  let user;
  let db;

  before(async () => {
    db = await dbHandler.connect();
    await dbHandler.clearDatabase();

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
    const eventStartDate = new Date(2021, 5, 4).toLocaleString();
    const eventEndDate = new Date(2021, 5, 6).toLocaleString();

    let res = await insertBattle(db, {
      battleName: "Battle of the legends",
      boardGameName: "Boardie",
      details: "This is a battle for the legends",
      eventStartDate,
      eventEndDate,
      status: "PENDING",
    });

    expect(res.success).to.equal(true);
    expect(res.response.data.onlineBattle.battleName).to.equal(
      "Battle of the legends"
    );
    expect(res.response.data.onlineBattle.boardGameName).to.equal("Boardie");
    expect(res.response.data.onlineBattle.slug).to.equal(
      `battle-of-the-legends-${dayjs(eventStartDate).format("MM-DD-YYYY")}`
    );
    expect(res.response.data.onlineBattle.details).to.equal(
      "This is a battle for the legends"
    );
    expect(res.response.data.onlineBattle.eventStartDate).to.equal(
      eventStartDate
    );
    expect(res.response.data.onlineBattle.eventEndDate).to.equal(eventEndDate);
    expect(res.response.data.onlineBattle.status).to.equal("PENDING");
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

    expect(res.success).to.equal(true);
    expect(res.response.data.entry.userId).to.equal(user._id);
    expect(res.response.data.entry.battleId).to.equal(123);
    expect(res.response.data.entry.score).to.equal(456);
    expect(res.response.data.entry.message).to.equal("Successfully Joined!");
    expect(res.response.data.entry.googleLink).to.equal("https://battles.com");
    expect(res.response.data.entry.verifiedStatus).to.equal("approved");
  });

  it("should fetch online battles", async () => {
    let res = await getBattles(db, {});
    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal("1 Online Battle retrieved");
    expect(res.response.data.onlineBattles).to.an("array");
  });

  it("should filter online battles", async () => {
    let res = await filterOnlineBattles(db, {
      filter: "status",
      field: "PENDING",
      first: null,
    });

    expect(res.success).to.equal(true);
    expect(res.response.data.onlineBattles[0].status).to.equal("PENDING");
  });
});
