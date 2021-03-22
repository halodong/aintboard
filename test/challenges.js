const { should } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);

let expect = chai.expect;

describe("Create Challenge", () => {
  describe("/POST /api/challenges", () => {
    it("it should create a challenge", (done) => {
      chai
        .request(process.env.LOCAL_URL)
        .post("/api/challenges")
        .send({
          challengeName: "Score 170 VP in a 4-Player match in Brass Lancashire",
          bgId: 1,
          bgName: "Glendell",
          bgYear: "2021",
          powerUpAmount: 2,
        })
        .end((err, res) => {
          if (err) done();
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.response.message).to.equal("Challenge created");
        });

      done();
    });

    it("it should display all the challenges", (done) => {
      chai
        .request(process.env.LOCAL_URL)
        .get("/api/challenges")
        .send()
        .end((err, res) => {
          if (err) done();

          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.response.message).to.equal(
            "Display all the challenges"
          );
        });

      done();
    });

    it("it should filter the challenges by bgId", (done) => {
      chai
        .request(process.env.LOCAL_URL)
        .get("/api/challenge/bgId/2")
        .send()
        .end((err, res) => {
          if (err) done();

          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.response.message).to.equal("Filtered Challenges");
        });

      done();
    });

    it("it should filter the challenges by bgYear", (done) => {
      chai
        .request(process.env.LOCAL_URL)
        .get("/api/challenge/bgYear/2021")
        .send()
        .end((err, res) => {
          if (err) done();

          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.response.message).to.equal("Filtered Challenges");
        });

      done();
    });

    it("it should filter the challenges by powerUpAmount", (done) => {
      chai
        .request(process.env.LOCAL_URL)
        .get("/api/challenge/powerUpAmount/4")
        .send()
        .end((err, res) => {
          if (err) done();

          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.response.message).to.equal("Filtered Challenges");
        });

      done();
    });
  });
});
