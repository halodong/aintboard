let chai = require("chai");
let chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);

let expect = chai.expect;

describe("Create Online Battle /POST /api/online-battles", () => {
  it("it should create an online battle", (done) => {
    chai
      .request(process.env.LOCAL_URL)
      .post("/api/online-battles")
      .send({
        battleName: "Battle of the legends",
        boardGameName: "Boardie",
        bgId: 54321,
        details: "This is a battle for the legends",
        eventStartDate: "4-05-2021",
        eventEndDate: "5-05-2021",
      })
      .end((err, res) => {
        if (err) done();
        expect(res.status).to.equal(200);
        expect(res.body.battle.battleName).to.equal("Battle of the legends");
        expect(res.body.battle.boardGameName).to.equal("Boardie");
        expect(res.body.battle.bgId).to.equal(54321);
        expect(res.body.battle.details).to.equal(
          "This is a battle for the legends"
        );
        expect(res.body.battle.eventStartDate).to.equal("4-05-2021");
        expect(res.body.battle.eventEndDate).to.equal("5-05-2021");
        done();
      });
  });
});
