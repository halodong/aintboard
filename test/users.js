import { insertUser } from "../db/user";
import { getUsers } from "../db/users";
const chai = require("chai");
const expect = chai.expect;
const dbHandler = require("./db-handler");

describe("Users", () => {
  let db;

  before(async () => {
    try {
      db = await dbHandler.connect();
      await dbHandler.clearDatabase();

      await insertUser(db, {
        username: "bt",
        email: "faith+test@gmail.com",
        password: "1234aaaa",
      });

      await insertUser(db, {
        username: "bt2",
        email: "faith+test2@gmail.com",
        password: "1234aaaa",
      });
    } catch (e) {
      throw e;
    }
  });

  after(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
  });

  it("should get all users", async () => {
    let res = await getUsers(db, { first: null });

    const count = res.response.data.users.length;

    const message =
      count === 1
        ? "1 User retrieved"
        : count > 1
        ? `${count} Users retrieved`
        : `No Users retrieved`;

    expect(res.success).to.equal(true);
    expect(res.response.message).to.equal(message);
    expect(res.response.data.users).to.be.an("array");
  });
});
