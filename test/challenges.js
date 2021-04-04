import {
  insertChallenge,
  getAllChallenges,
  filterChallenges,
} from "../db/challenges";

const chai = require("chai");
const expect = chai.expect;
const dbHandler = require("./db-handler");

describe("Challenge routes", () => {
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

  it("should create a challenge", async () => {
    let res = await insertChallenge(db, {
      challengeName: "Score 170 VP in a 4-Player match in Brass Lancashire",
      bgId: 2,
      bgName: "Chess",
      bgYear: 2018,
      powerUpAmount: 4,
    });

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal("Challenge created");
    expect(res.response.data.challenge.challengeName).to.equal(
      "Score 170 VP in a 4-Player match in Brass Lancashire"
    );
    expect(res.response.data.challenge.bgId).to.equal(2);
    expect(res.response.data.challenge.bgName).to.equal("Chess");
    expect(res.response.data.challenge.bgYear).to.equal(2018);
    expect(res.response.data.challenge.powerUpAmount).to.equal(4);
  });

  it("should display all the challenges", async () => {
    let res = await getAllChallenges(db, { first: null });

    expect(res.success).to.equal(true);

    const count = res.response.data.challenges.length;

    const message =
      count === 1
        ? "1 Challenge retrieved"
        : count > 1
        ? `${count} Challenges retrieved`
        : `No Challenges retrieved`;

    expect(res.response.message).to.equal(message);
  });

  it("should display first 6 challenges", async () => {
    let res = await getAllChallenges(db, { first: 6 });

    expect(res.success).to.equal(true);

    const count = res.response.data.challenges.length;

    const message =
      count === 1
        ? "1 Challenge retrieved"
        : count > 1
        ? `${count} Challenges retrieved`
        : `No Challenges retrieved`;

    expect(res.response.message).to.equal(message);
  });

  it("should filter the challenges by bgId", async () => {
    let res = await filterChallenges(db, {
      filter: "bgId",
      field: 2,
    });

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal("Filtered Challenges");
    expect(res.response.data.challenges.map((e) => e.bgId)).to.include(2);
  });

  it("should filter the challenges by bgYear", async () => {
    let res = await filterChallenges(db, {
      filter: "bgYear",
      field: 2018,
    });

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal("Filtered Challenges");
    expect(res.response.data.challenges.map((e) => e.bgYear)).to.include(2018);
  });

  it("should filter the challenges by powerUpAmount", async () => {
    let res = await filterChallenges(db, {
      filter: "powerUpAmount",
      field: 4,
    });

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal("Filtered Challenges");
    expect(res.response.data.challenges.map((e) => e.powerUpAmount)).to.include(
      4
    );
  });

  it("should filter the challenges by bgName", async () => {
    let res = await filterChallenges(db, {
      filter: "bgName",
      field: "Chess",
    });

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal("Filtered Challenges");
    expect(res.response.data.challenges.map((e) => e.bgName)).to.include(
      "Chess"
    );
  });
});
