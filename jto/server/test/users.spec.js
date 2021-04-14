const knex = require("knex");
const app = require("../src/app");
const helpers = require("./testHelpers");

describe(`User Endpoints`, () => {
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

  describe(`GET /api/users/`, () => {
    // at least 1 user must be in database, as this is a protected endpoint
    context("Users in database", () => {
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

      it(`returns with 200 and all users`, () => {
        // can only be admin!!
        let requestingUser = testUsers[0];
        return supertest(app)
          .get(`/api/users`)
          .set("Authorization", helpers.makeAuthHeader(requestingUser))
          .expect(200, {
            success: true,
            message: "Showing data for all users and their accounts.",
            data: testUsers.map((u) => helpers.makeExpectedUser(u)),
          });
      });
    });
  });

  describe(`GET /api/users/:user_id`, () => {
    context("user exists and requester is also user", () => {
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

      it(`returns with 200 and the requesting user's own account`, () => {
        let requestingUser = testUsers[1];
        return supertest(app)
          .get(`/api/users/${requestingUser.id}`)
          .set("Authorization", helpers.makeAuthHeader(requestingUser))
          .expect(200, {
            success: true,
            message: `Found user with id of ${requestingUser.id}.`,
            payload: helpers.makeExpectedUser(requestingUser),
          });
      });
    });
  });

  describe(`POST /api/users/`, () => {
    context("Incomplete user registration", () => {
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
      const incompleteFields = [
        {
          user_name: "mike",
          email: "mickey@gmail.com",
        },
        {
          password: "passwordF3@",
        },
        {
          user_name: "mike",
          password: "passwordF3@",
        },
        {
          user_name: "mike",
          full_name: "mike wazowski",
          password: "passwordF3@",
        },
      ];
      incompleteFields.forEach((request) => {
        it("Throws error when missing key fields", () => {
          return supertest(app).post(`/api/users`).send(request).expect(400);
        });
      });
    });

    context("Invalid user registration", () => {
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

      const invalidFields = [
        {
          user_name: "test-user-1",
          full_name: "Invalory Profane",
          email: "validemail@gmail.com",
          password: "Validpwd45!",
        },
        {
          user_name: "valid-test-user",
          full_name: "Invalory Profane",
          email: "test1@email.com",
          password: "Validpwd45!",
        },
        {
          user_name: "  spacey-test-user",
          full_name: "Invalory Profane",
          email: "test1@email.com",
          password: "Validpwd45!",
        },
        {
          user_name: "ass",
          full_name: "Invalory Profane",
          email: "validemail@gmail.com",
          password: "Validpwd45!",
        },
        {
          user_name: "@#$%#-the-first",
          full_name: "Invalory Profane",
          email: "validemail@gmail.com",
          password: "Validpwd45!",
        },
        {
          user_name: "q",
          full_name: "Invalory Profane",
          email: "validemail@gmail.com",
          password: "invalidpassword",
        },
        {
          user_name:
            "invalidinvalidinvalidinvalidinvalidinvalidinvalidkjsddpoijkopjpokpokpokopkpokopkpokpokpok",
          full_name: "Invalory Profane",
          email: "validemail@gmail.com",
          password: "invalidpassword",
        },
        {
          user_name: "valid",
          full_name: "Invalory Profane",
          email: "validemail@gmail.com",
          password: "Pwd45!",
        },
        {
          user_name: "valid",
          full_name: "Invalory Profane",
          email: "validemail@gmail.com",
          password:
            "invalidpasswordinvalidpasswordinvalidpasswordinvalidpasswordinvalidpasswordinvalidpasswordinvalidpasswordinvalidpasswordinvalidpasswordinvalidpassword",
        },
        {
          user_name: "valid-user",
          full_name: "Invalory Profane",
          email: "not@mailletmeloginalready@",
          password: "Validpwd45!",
        },
      ];

      invalidFields.forEach((request) => {
        it("Throws error when invalid req", () => {
          return supertest(app)
            .post(`/api/users`)
            .send(request)
            .expect(400)
            .expect((res) => {
              console.log(res.body);
              //   expect(res.body).to.have.property("error");
            });
        });
      });
    });

    context("Valid and complete user registration", () => {
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

      const validFields = [
        {
          user_name: "valid-user",
          full_name: "Invalory Profane",
          email: "validemail@gmail.com",
          password: "Validpwd45!",
        },
        {
          admin: true,
          user_name: "valid-user",
          full_name: "Invalory Profane",
          email: "validemail@gmail.com",
          password: "Validpwd45!",
        },
      ];

      validFields.forEach((request) => {
        it("creates new user", () => {
          return supertest(app).post(`/api/users`).send(request).expect(201);
        });
      });
    });
  });

  describe(`DELETE /api/users/:user_id`, () => {
    context("user exists and requester is also user", () => {
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

      it(`returns with 204 and lets user delete their own account`, () => {
        let requestingUser = testUsers[1];
        return supertest(app)
          .delete(`/api/users/${requestingUser.id}`)
          .set("Authorization", helpers.makeAuthHeader(requestingUser))
          .expect(204);
      });
    });
  });
});
