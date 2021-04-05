import { authenticateUser, insertUser } from "../db/user";
const dbHandler = require("./db-handler");
const chai = require("chai");
const expect = chai.expect;

describe("User routes", () => {
  let db;
  const password = "password";
  const email = "brad@traversymedia.com";

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

  it("should add a new user", async () => {
    let res = await insertUser(db, {
      username: "bt",
      email,
      password,
    });

    expect(res.success).to.equal(true);
    expect(res.response.data.user._id).to.be.a("string");
    expect(res.response.data.user.email).to.equal("brad@traversymedia.com");
    expect(res.response.data.user.username).to.equal("bt");
    expect(res.response.data.user.role).to.equal("guest");
  });

  it("should log user into the app", async () => {
    let res = await authenticateUser(db, {
      email,
      password,
    });

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal("Login Successful");
    expect(res.response.data.token).to.exist;
    expect(res.response.data.token).to.be.a("string");
  });
});
