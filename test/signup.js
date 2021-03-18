let chai = require("chai");
let chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);

let expect = chai.expect;

describe("Signup /POST /api/signup", () => {
  it("it should add a new user", (done) => {
    chai
      .request(process.env.LOCAL_URL)
      .post("/api/signup")
      .send({
        firstName: "Brad",
        lastName: "Traversy",
        email: "brad@traversymedia.com",
        password: "traversymedia",
      })
      .end((err, res) => {
        if (err) done();
        expect(res.status).to.equal(200);
        expect(res.body.user.firstName).to.equal("Brad");
        expect(res.body.user.lastName).to.equal("Traversy");
        expect(res.body.user.email).to.equal("brad@traversymedia.com");
        done();
      });
  });
});
