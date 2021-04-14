const app = require("../src/app");
const knex = require("knex");
const helpers = require("./testHelpers");

describe(`Protected endpoints`, () => {
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

  beforeEach("insert cards", () =>
    helpers.seedCardsTables(db, testUsers, testCards, testComments, testActions)
  );

  const protectedEndpoints = [
    {
      name: "GET /api/dashboard/cards/:user_id",
      path: "/api/dashboard/cards/:user_id",
      method: supertest(app).get,
    },
    {
      name: "POST /api/dashboard/cards/:user_id",
      path: "/api/dashboard/cards/:user_id",
      method: supertest(app).post,
    },
    {
      name: "GET /api/dashboard/cards/:user_id/:card_id",
      path: "/api/dashboard/cards/:user_id",
      method: supertest(app).get,
    },
    {
      name: "DELETE /api/dashboard/cards/:user_id/:card_id",
      path: "/api/dashboard/cards/:user_id",
      method: supertest(app).delete,
    },
    {
      name: "PATCH /api/dashboard/cards/:user_id/:card_id",
      path: "/api/dashboard/cards/:user_id",
      method: supertest(app).patch,
    },
    {
      name: "PATCH /api/dashboard/publish/:user_id/:card_id",
      path: "/api/dashboard/publish/:user_id/:card_id",
      method: supertest(app).patch,
    },
    {
      name: "PATCH /api/gallery/unpublish/:card_id",
      path: "/api/gallery/unpublish/:card_id",
      method: supertest(app).patch,
    },
    {
      name: "POST /api/comments",
      path: "/api/comments",
      method: supertest(app).post,
    },
    {
      name: "GET /api/comments/:comment_id",
      path: "/api/comments/:comment_id",
      method: supertest(app).get,
    },
    {
      name: "DELETE /api/comments/:comment_id",
      path: "/api/comments/:comment_id",
      method: supertest(app).delete,
    },
    {
      name: "PATCH /api/comments/:comment_id",
      path: "/api/comments/:comment_id",
      method: supertest(app).patch,
    },
    {
      name: "GET /api/actions/likes/:card_id",
      path: "/api/actions/likes/:card_id",
      method: supertest(app).get,
    },
    {
      name: "POST /api/actions/likes/:card_id",
      path: "/api/actions/likes/:card_id",
      method: supertest(app).post,
    },
    {
      name: "PATCH /api/actions/likes/:card_id",
      path: "/api/actions/likes/:card_id",
      method: supertest(app).patch,
    },
    {
      name: "GET /api/actions/saves/:card_id",
      path: "/api/actions/saves/:card_id",
      method: supertest(app).get,
    },
    {
      name: "POST /api/actions/saves/:card_id",
      path: "/api/actions/saves/:card_id",
      method: supertest(app).post,
    },
    {
      name: "PATCH /api/actions/saves/:card_id",
      path: "/api/actions/saves/:card_id",
      method: supertest(app).patch,
    },
    {
      name: "GET /api/users/",
      path: "/api/users",
      method: supertest(app).get,
    },
    {
      name: "GET /api/users/:user_id",
      path: "/api/users/:user_id",
      method: supertest(app).get,
    },
    {
      name: "DELETE /api/users/:user_id",
      path: "/api/users/:user_id",
      method: supertest(app).delete,
    },
  ];

  protectedEndpoints.forEach((endpoint) => {
    describe(`${endpoint.name}`, () => {
      if (endpoint.path !== "/api/gallery/unpublish/:card_id") {
        it(`responds with 401: 'Missing Bearer Token', when no token`, () => {
          return endpoint.method(endpoint.path).expect(401, {
            success: false,
            message: `Unauthorized Request. Please provide proper credentials.`,
          });
        });

        it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
          const validUser = testUsers[0];
          const invalidSecret = "bad-secret";
          return endpoint
            .method(endpoint.path)
            .set(
              "Authorization",
              helpers.makeAuthHeader(validUser, invalidSecret)
            )
            .expect(401, {
              success: false,
              message: `Unauthorized Request. Please provide proper credentials.`,
            });
        });

        it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
          const invalidUser = { email: "user-not-existy", id: 1 };
          return endpoint
            .method(endpoint.path)
            .set("Authorization", helpers.makeAuthHeader(invalidUser))
            .expect(401, {
              success: false,
              message: `Unauthorized Request. Please provide proper credentials.`,
            });
        });
      }
    });
  });
});
