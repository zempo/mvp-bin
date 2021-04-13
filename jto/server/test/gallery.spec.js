const knex = require("knex");
const app = require("../src/app");
const helpers = require("./testHelpers");

describe(`Gallery Endpoints`, () => {
  let db;

  const {
    testUsers,
    testCards,
    testComments,
    testActions,
  } = helpers.makeJtoFixtures();

  before(`Instantiate knex`, () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe(`GET public cards at /api/gallery`, () => {
    after("spacing", () =>
      console.log("-------------------------------------\n")
    );
    context(`Given no public cards`, () => {
      after("spacer", () => console.log("\n"));
      it(`Responds with 200 and an empty list`, () => {
        return supertest(app).get("/api/gallery").expect(200, {
          success: true,
          message: "Showing all published cards.",
          payload: [],
        });
      });
    });

    context(`Given existing public cards`, () => {
      after("spacer", () => console.log("\n"));
      beforeEach("insert cards", () =>
        helpers.seedCardsTables(
          db,
          testUsers,
          testCards,
          testComments,
          testActions
        )
      );

      it(`Responds with 200 and all public cards`, () => {
        const expectedCards = testCards.filter((c) => c.public);
        const serializedCards = expectedCards.map((c) => {
          return helpers.makeExpectedCard(testUsers, c, testComments);
        });

        return supertest(app).get("/api/gallery").expect(200, {
          success: true,
          message: "Showing all published cards.",
          payload: serializedCards,
        });
      });
    });

    context("Given an XSS attack card", () => {
      after("spacer", () => console.log("\n"));
      const testUser = helpers.makeUsersArray()[0];
      const { maliciousCard, expectedCard } = helpers.makeMaliciousCard(
        testUser
      );

      beforeEach("Insert malicious card", () => {
        return helpers.seedMaliciousCard(db, testUser, maliciousCard);
      });

      it("Removes XSS attack content", () => {
        return supertest(app)
          .get(`/api/gallery`)
          .expect(200)
          .expect((res) => {
            expect(res.body.payload[0].front_message).to.eql(
              expectedCard.front_message
            );
            expect(res.body.payload[0].inside_message).to.eql(
              expectedCard.inside_message
            );
          });
      });
    });
  });

  describe(`GET a public card at api/gallery/:card_id`, () => {
    after("spacing", () =>
      console.log("-------------------------------------\n")
    );
    context(`Given a public card doesn't exist or isn't public`, () => {
      after("spacer", () => console.log("\n"));
      beforeEach("insert cards", () =>
        helpers.seedCardsTables(
          db,
          testUsers,
          testCards,
          testComments,
          testActions
        )
      );

      it(`Responds with 404 because it doesn't exist`, () => {
        let card_id = 999999042;
        return supertest(app).get(`/api/gallery/${card_id}`).expect(404, {
          success: false,
          message: `This public card no longer exists. It might have been deleted or unpublished.`,
        });
      });

      it(`Responds with 404 because it isn't public`, () => {
        let card_id = 4;
        return supertest(app).get(`/api/gallery/${card_id}`).expect(404, {
          success: false,
          message: `This public card no longer exists. It might have been deleted or unpublished.`,
        });
      });
    });

    context(`Given a public card that exists`, () => {
      after("spacer", () => console.log("\n"));
      beforeEach("insert cards", () =>
        helpers.seedCardsTables(
          db,
          testUsers,
          testCards,
          testComments,
          testActions
        )
      );

      it(`Responds with 200 and card`, () => {
        let card_id = 1;
        const expectedCard = helpers.makeExpectedCard(
          testUsers,
          testCards[card_id - 1],
          testComments
        );
        return supertest(app)
          .get(`/api/gallery/${card_id}`)
          .expect(200, {
            success: true,
            message: `Showing published card with id: "${expectedCard.id}".`,
            payload: expectedCard,
          });
      });
    });

    context("Given an XSS attack card", () => {
      after("spacer", () => console.log("\n"));
      const testUser = helpers.makeUsersArray()[0];
      const { maliciousCard, expectedCard } = helpers.makeMaliciousCard(
        testUser
      );

      beforeEach("Insert malicious card", () => {
        return helpers.seedMaliciousCard(db, testUser, maliciousCard);
      });

      it("Removes XSS attack content", () => {
        return supertest(app)
          .get(`/api/gallery/${maliciousCard.id}`)
          .expect(200)
          .expect((res) => {
            // console.log(res.body);
            expect(res.body.payload.front_message).to.eql(
              expectedCard.front_message
            );
            expect(res.body.payload.inside_message).to.eql(
              expectedCard.inside_message
            );
          });
      });
    });
  });

  describe("GET comments of a card at /api/gallery/comments/:card_id", () => {
    context("The card exists, but there are no comments", () => {
      after("spacer", () => console.log("\n"));
      beforeEach("insert cards", () =>
        helpers.seedCardsTables(
          db,
          testUsers,
          testCards,
          testComments,
          testActions
        )
      );

      it("Responds with 200 and empty array", () => {
        let card_id = 7;

        return supertest(app)
          .get(`/api/gallery/comments/${card_id}`)
          .expect(200, {
            success: true,
            message: `Showing card comments for card with id: "${card_id}".`,
            payload: [],
          });
      });
    });

    context("The card exists and has comments", () => {
      after("spacer", () => console.log("\n"));
      beforeEach("insert cards", () =>
        helpers.seedCardsTables(
          db,
          testUsers,
          testCards,
          testComments,
          testActions
        )
      );
      it("Responds with 200 and the corresponding comments", () => {
        let card_id = 6;
        const expectedCardComments = helpers.makeExpectedCardComments(
          card_id,
          testComments,
          testUsers
        );

        return supertest(app)
          .get(`/api/gallery/comments/${card_id}`)
          .expect(200, {
            success: true,
            message: `Showing card comments for card with id: "${card_id}".`,
            payload: expectedCardComments,
          });
      });
    });
  });

  describe("PATCH the privacy of a card at /api/gallery/unpublish/:card_id", () => {
    context("The card has already been made private", () => {
      after("spacer", () => console.log("\n"));
      beforeEach("insert cards", () =>
        helpers.seedCardsTables(
          db,
          testUsers,
          testCards,
          testComments,
          testActions
        )
      );

      it(`Responds with 404 because the resource has been moved or deleted`, () => {
        let card_id = 4;
        return supertest(app)
          .patch(`/api/gallery/unpublish/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(404, {
            message: `This public card no longer exists. It might have been deleted or made private.`,
          });
      });
    });

    context("The card is public", () => {
      beforeEach("insert cards", () =>
        helpers.seedCardsTables(
          db,
          testUsers,
          testCards,
          testComments,
          testActions
        )
      );

      it(`Responds with 403 because the card does not belong to the user`, () => {
        let card_id = 5;
        return supertest(app)
          .patch(`/api/gallery/unpublish/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(403);
      });

      it(`Responds with 204 because the card exists and belongs to the user`, () => {
        let card_id = 5;
        return supertest(app)
          .patch(`/api/gallery/unpublish/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(204);
      });
    });
  });
});
