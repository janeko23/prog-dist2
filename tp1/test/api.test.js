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

 /**
  * Testing items endpoint by giving an existing of a specific type shows the elements of it
  */
 describe("GET /api/videoClub/:type", () => {
   it("respond with json containing a the element of that type", (done) => {
     request(app)
       .get("/api/videoClub/rent")
       .set("Accept", "application/json")
       .expect("Content-Type", /json/)
       .expect(200, done);
   });
   it("respond with json containing a the element of that type", (done) => {
     request(app)
       .get("/api/videoClub/delivery_to_rent")
       .set("Accept", "application/json")
       .expect("Content-Type", /json/)
       .expect(200, done);
   });
  it("respond with json containing a the element of that type", (done) => {
    request(app)
      .get("/api/videoClub/return")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
      it("respond with json containing a the element of that type", (done) => {
        request(app)
          .get("/api/videoClub/delivery_to_return")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200, done);
      });
   it("respond with json not found when the element of that type does not exists", (done) => {
     request(app)
       .get("/api/videoClub/typeNoExistente")
       .set("Accept", "application/json")
       .expect("Content-Type", /json/)
       .expect(404)
       .expect('"Type error. ONLY VALID: RENT,  DELIVERY_TO_RENT / RETURN / DELIVERY_TO_RETURN"')
       .end((err) => {
         if (err) return done(err);
         done();
       });
   });
 });

 