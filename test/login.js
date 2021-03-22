let chai = require("chai");
let chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);

let expect = chai.expect;

describe("Login /POST /api/login", () => {
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
