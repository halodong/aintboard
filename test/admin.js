import { authenticateAdmin, insertUser } from "../db/user";

const dbHandler = require("./db-handler");
const chai = require("chai");
const expect = chai.expect;

describe("Admin routes", () => {
  let db;
  const password = "password";
  const username = "admin";

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

  it("should add a new admin", async () => {
    let res = await insertUser(db, {
      username,
      email: "admin@admin.com",
      password,
      role: "admin",
    });

    expect(res.success).to.equal(true);
    expect(res.response.data.user._id).to.be.a("string");
    expect(res.response.data.user.email).to.equal("admin@admin.com");
    expect(res.response.data.user.username).to.equal("admin");
    expect(res.response.data.user.role).to.equal("admin");
  });

  it("should log admin into the dashboard", async () => {
    let res = await authenticateAdmin(db, {
      username,
      password,
    });

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal("Login Successful");
    expect(res.response.data.token).to.exist;
    expect(res.response.data.token).to.be.a("string");
    expect(res.response.data.user.role).to.equal("admin");
  });
});
