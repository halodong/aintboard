import db from "./db";
let chai = require("chai");
let chaiHttp = require("chai-http");

chai.use(chaiHttp);

let expect = chai.expect;

describe("User routes", () => {
  before(async () => {
    let database = await db();

    try {
      await database.db.dropDatabase();
    } catch (e) {
      throw e;
    }

    database.client.close();
  });

  it("it should add a new user", (done) => {
    chai
      .request(process.env.LOCAL_URL)
      .post("/api/signup")
      .send({
        firstName: "Brad",
        lastName: "Traversy",
        username: "bt",
        email: "brad@traversymedia.com",
        password: "traversymedia",
      })
      .end((err, res) => {
        if (err) done();

        expect(res.status).to.equal(200);
        expect(res.body.user.firstName).to.equal("Brad");
        expect(res.body.user.lastName).to.equal("Traversy");
        expect(res.body.user.email).to.equal("brad@traversymedia.com");
        expect(res.body.user.username).to.equal("bt");
        expect(res.body.user.role).to.equal("guest");

        done();
      });
  });

  it("it should log user into the app", (done) => {
    chai
      .request(process.env.LOCAL_URL)
      .post("/api/login")
      .send({
        email: "brad@traversymedia.com",
        password: "traversymedia",
      })
      .end((err, res) => {
        if (err) done();
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.data.message).to.equal("Login Successful");
        done();
      });
  });
});
