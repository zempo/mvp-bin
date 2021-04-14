const knex = require("knex");
const app = require("../src/app");
const helpers = require("./testHelpers");

describe("Card Actions endpoints", function () {
  let db;

  const {
    testUsers,
    testCards,
    testComments,
    testActions,
  } = helpers.makeJtoFixtures();

  before("Instantiate knex", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  // beforeEach("insert cards", () => helpers.seedCardsTables(db, testUsers, testCards, testComments, testActions));

  describe(`GET all action counts /api/actions/`, () => {
    after("spacing", () =>
      console.log("-------------------------------------\n")
    );
    context(`Given there are public cards`, () => {
      after("spacing", () => console.log("\n"));
      beforeEach("insert cards", () =>
        helpers.seedCardsTables(
          db,
          testUsers,
          testCards,
          testComments,
          testActions
        )
      );

      it("Returns accurate card action counts for all cards", () => {
        const expectedCards = testCards
          .filter((card, i, cards) => {
            if (card["public"] == true) {
              return true;
            } else {
              return false;
            }
          })
          .map((card) => {
            return helpers.makeExpectedActions(card, testActions);
          });
        // console.log(expectedCards);
        return supertest(app).get("/api/actions").expect(200, {
          success: true,
          message: `Showing cards with action status.`,
          payload: expectedCards,
        });
      });
    });
  });

  describe(`GET the actions of a single card`, () => {
    after("spacing", () =>
      console.log("-------------------------------------\n")
    );
    context(`Given a public card doesn't exist or isn't public`, () => {
      after("spacing", () => console.log("\n"));
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
        return supertest(app).get(`/api/actions/${card_id}`).expect(404, {
          success: false,
          message:
            "This card's actions are unavailable. The card might have been moved or deleted.",
        });
      });

      it(`Responds with 404 because it isn't public`, () => {
        let card_id = 4;
        return supertest(app).get(`/api/actions/${card_id}`).expect(404, {
          success: false,
          message:
            "This card's actions are unavailable. The card might have been moved or deleted.",
        });
      });
    });

    context(`Given a public card that exists`, () => {
      after("spacing", () => console.log("\n"));
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
        const expectedCard = helpers.makeExpectedActions(
          testCards[card_id - 1],
          testActions
        );
        return supertest(app)
          .get(`/api/actions/${card_id}`)
          .expect(200, {
            success: true,
            message: `Showing action status for card with id of ${1}.`,
            payload: expectedCard,
          });
      });
    });
  });

  describe(`GET /api/actions/likes/:card_id and /api/actions/saves/:card_id by current user`, () => {
    after("spacing", () =>
      console.log("-------------------------------------\n")
    );
    beforeEach("insert cards", () =>
      helpers.seedCardsTables2(
        db,
        testUsers,
        testCards,
        testComments,
        testActions
      )
    );

    context(`Given card is not public`, () => {
      after("spacing", () => console.log("\n"));
      it("Returns 404 error", () => {
        let card_id = 4;
        return supertest(app)
          .get(`/api/actions/likes/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(404, {
            success: false,
            message: `This card's actions are unavailable. The card might have been moved or deleted.`,
          });
      });

      it("Returns 404 error", () => {
        let card_id = 4;
        return supertest(app)
          .get(`/api/actions/likes/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(404, {
            success: false,
            message: `This card's actions are unavailable. The card might have been moved or deleted.`,
          });
      });
    });

    context(`Given a user hasn't reacted to the card`, () => {
      after("spacing", () => console.log("\n"));
      it("returns 200 and empty array for likes", () => {
        let card_id = 5;
        return supertest(app)
          .get(`/api/actions/likes/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(200, []);
      });

      it("returns 200 and empty array for saves", () => {
        let card_id = 5;
        return supertest(app)
          .get(`/api/actions/likes/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(200, []);
      });
    });

    context(`Given user has posted a action`, () => {
      after("spacing", () => console.log("\n"));
      it("returns 200 and expected action", () => {
        let card_id = 2;
        let testUser = testUsers[1];
        let expectedAction = helpers.makeExpectedActionsByUser(
          card_id,
          testUser.id,
          testActions
        );

        return supertest(app)
          .get(`/api/actions/likes/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(200, expectedAction);
      });

      it("returns 200 and expected action", () => {
        let card_id = 2;
        let testUser = testUsers[1];
        let expectedAction = helpers.makeExpectedActionsByUser(
          card_id,
          testUser.id,
          testActions
        );

        return supertest(app)
          .get(`/api/actions/likes/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(200, expectedAction);
      });
    });
  });

  describe(`POST new action through /api/actions/likes/:card_id and /api/actions/saves/:card_id by current user`, () => {
    after("spacing", () =>
      console.log("-------------------------------------\n")
    );
    beforeEach("insert cards", () =>
      helpers.seedCardsTables2(
        db,
        testUsers,
        testCards,
        testComments,
        testActions
      )
    );

    context(
      `Given user posts new action to a non-existant/private card`,
      () => {
        after("spacing", () => console.log("\n"));
        it("returns 404 error", () => {
          let card_id = 4;
          let testUser = testUsers[1];
          let expectedAction = helpers.makeExpectedActionsByUser(
            card_id,
            testUser.id,
            testActions
          );

          return supertest(app)
            .post(`/api/actions/likes/${card_id}`)
            .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
            .expect(404, {
              success: false,
              message: `This card's actions are unavailable. The card might have been moved or deleted.`,
            });
        });

        it("returns 404 error", () => {
          let card_id = 4;
          let testUser = testUsers[1];
          let expectedAction = helpers.makeExpectedActionsByUser(
            card_id,
            testUser.id,
            testActions
          );

          return supertest(app)
            .post(`/api/actions/saves/${card_id}`)
            .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
            .expect(404, {
              success: false,
              message: `This card's actions are unavailable. The card might have been moved or deleted.`,
            });
        });
      }
    );

    context(`Given accidentally posts action to card again`, () => {
      after("spacing", () => console.log("\n"));
      it("returns 400 error", () => {
        let card_id = 2;
        let testUser = testUsers[1];

        return supertest(app)
          .post(`/api/actions/likes/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(400, {
            success: false,
            message: `Can't post action more than once.`,
          });
      });

      it("returns 400 error", () => {
        let card_id = 2;
        let testUser = testUsers[1];

        return supertest(app)
          .post(`/api/actions/saves/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(400, {
            success: false,
            message: `Can't post action more than once.`,
          });
      });
    });

    context(`Given user posts new action to an existing public card`, () => {
      after("spacing", () => console.log("\n"));
      it("returns 201 and expected like", () => {
        let card_id = 1;
        let testUser = testUsers[1];
        let expectedAction = helpers.makeExpectedActionsByUser(
          card_id,
          testUser.id,
          testActions
        );

        return supertest(app)
          .post(`/api/actions/likes/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(201);
      });

      it("returns 201 and expected saved", () => {
        let card_id = 1;
        let testUser = testUsers[1];
        let expectedAction = helpers.makeExpectedActionsByUser(
          card_id,
          testUser.id,
          testActions
        );

        return supertest(app)
          .post(`/api/actions/saves/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(201);
      });
    });
  });

  describe(`PATCH to toggle current action through /api/actions/likes/:card_id and /api/actions/saves/:card_id by current user`, () => {
    after("spacing", () =>
      console.log("-------------------------------------\n")
    );
    beforeEach("insert cards", () =>
      helpers.seedCardsTables2(
        db,
        testUsers,
        testCards,
        testComments,
        testActions
      )
    );

    context(`Given the card does not exist`, () => {
      it("Toggles like to opposite", () => {
        let card_id = 4;
        let testUser = testUsers[1];

        return supertest(app)
          .patch(`/api/actions/likes/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(404, {
            success: false,
            message: `This card's actions are unavailable. The card might have been moved or deleted.`,
          });
      });

      it("Toggles saved to true", () => {
        let card_id = 4;
        let testUser = testUsers[1];

        return supertest(app)
          .patch(`/api/actions/saves/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(404, {
            success: false,
            message: `This card's actions are unavailable. The card might have been moved or deleted.`,
          });
      });
    });

    context(`Given user hasn't posted action`, () => {
      it("Returns error", () => {
        let card_id = 5;
        let testUser = testUsers[1];

        return supertest(app)
          .patch(`/api/actions/likes/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(403, {
            success: false,
            message: `Can't update action unless it is posted and references BOTH logged-in user AND card.`,
          });
      });

      it("Returns error", () => {
        let card_id = 5;
        let testUser = testUsers[1];

        return supertest(app)
          .patch(`/api/actions/saves/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(403, {
            success: false,
            message: `Can't update action unless it is posted and references BOTH logged-in user AND card.`,
          });
      });
    });

    context(`Given user has posted action`, () => {
      it("Toggles like to opposite", () => {
        let card_id = 2;
        let testUser = testUsers[1];

        return supertest(app)
          .patch(`/api/actions/likes/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(204);
      });

      it("Toggles saved to true", () => {
        let card_id = 2;
        let testUser = testUsers[1];

        return supertest(app)
          .patch(`/api/actions/saves/${card_id}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
          .expect(204);
      });
    });
  });
});
