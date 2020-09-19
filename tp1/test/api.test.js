const request = require('supertest');

const app = require("../src/app")

/**
 * Testing get all the items in the list of the videoclub
 */

 describe("GET /api/videoClub", () => {
   it("respond with json containing a list of the videoclub", (done) => {
     request(app)
       .get("/api/videoClub")
       .set("Accept", "application/json")
       .expect("Content-Type", /json/)
       .expect(200, done);
   });
 });