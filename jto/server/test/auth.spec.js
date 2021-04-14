const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const helpers = require("./testHelpers");

describe(`Auth Token Endpoints`, () => {
  let db;

  const { testUsers } = helpers.makeJtoFixtures();

  const testUser = testUsers[0];

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

  describe(`POST /api/auth/login`, () => {
    after("spacing", () =>
      console.log("-------------------------------------\n")
    );
    beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

    const requiredFields = ["email", "password"];

    requiredFields.forEach((field) => {
      const loginAttemptBody = {
        email: testUser.email,
        password: testUser.password,
      };

      it(`responds with 400 required error when '${field}' is missing`, () => {
        delete loginAttemptBody[field];

        return supertest(app)
          .post("/api/auth/login")
          .send(loginAttemptBody)
          .expect(400, {
            success: false,
            message: `Please provide a '${field}' in request body.`,
          });
      });
    });

    it(`responds 401 'invalid email or password' when bad email`, () => {
      const userInvalidUser = { email: "user-not", password: "existy" };
      return supertest(app)
        .post("/api/auth/login")
        .send(userInvalidUser)
        .expect(401, {
          success: false,
          message: `Incorrect email or password, please try again.`,
        });
    });

    it(`responds 401 'invalid email or password' when bad password`, () => {
      const userInvalidPass = { email: testUser.email, password: "incorrect" };
      return supertest(app)
        .post("/api/auth/login")
        .send(userInvalidPass)
        .expect(401, {
          success: false,
          message: `Incorrect email or password, please try again.`,
        });
    });

    it(`responds 201 and JWT auth token using secret when valid credentials`, () => {
      const userValidCreds = {
        email: testUser.email,
        password: testUser.password,
      };
      const expectedToken = jwt.sign(
        { user_id: testUser.id }, // payload
        process.env.JWT_SECRET,
        {
          subject: testUser.email,
          expiresIn: process.env.JWT_EXPIRY,
          algorithm: "HS256",
        }
      );
      // console.log(expectedToken)
      return supertest(app)
        .post("/api/auth/login")
        .send(userValidCreds)
        .expect(201, {
          success: true,
          message: `Created new token.`,
          token: expectedToken,
        });
    });
  });

  describe(`POST /api/auth/refresh`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

    after("spacing", () =>
      console.log("-------------------------------------\n")
    );

    it(`responds 200 and JWT auth token using secret`, () => {
      //   this.retries(3);
      const testUser = testUsers[0];
      const expectedToken = jwt.sign(
        { user_id: testUser.id },
        process.env.JWT_SECRET,
        {
          subject: testUser.email,
          expiresIn: process.env.JWT_EXPIRY,
          algorithm: "HS256",
        }
      );

      return supertest(app)
        .post("/api/auth/refresh")
        .set("Authorization", helpers.makeAuthHeader(testUser))
        .expect(201, {
          success: true,
          message: `Created token refresh.`,
          token: expectedToken,
        });
    });
  });
});
