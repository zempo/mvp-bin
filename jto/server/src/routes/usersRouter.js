const express = require("express");
const path = require("path");
const { requireAuth } = require("../middleware/jwtAuthMW");

/**
 * SETUP
 * */
const usersService = require("../services/usersService");
const usersRouter = express.Router();
const bodyParser = express.json();

/**
 * @desc GET user data, POST new user account
 * @route POST /api/users
 * @access Admin, Private
 */
usersRouter
  .route("/")
  .get(requireAuth, checkUsersExist, (req, res) => {
    // for eventual admin/dev purposes
    // maybe client-side administration?
    if (req.user.admin) {
      return res.json({
        success: true,
        message: "Showing data for all users and their accounts.",
        data: usersService.serializeUsers(res.users),
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to view this resource.",
      });
    }
  })
  .post(bodyParser, (req, res, next) => {
    const { password, user_name, full_name, email } = req.body;
    const newUser = { password, user_name, admin: false, full_name, email };

    async function validateUser(user, service) {
      try {
        // if we get an error, we step out of function
        let missingKeys = await service.checkAllFields(user);
        if (missingKeys) {
          return res.status(400).json({
            success: false,
            message: missingKeys,
          });
        }

        let invalidUser = await service.validateUserName(user.user_name);
        if (invalidUser) {
          return res.status(400).json({
            success: false,
            message: invalidUser,
          });
        }

        let invalidName = await service.validateFullName(user.full_name);
        if (invalidName) {
          return res.status(400).json({
            success: false,
            message: invalidName,
          });
        }
        let invalidEmail = await service.validateEmail(user.email);
        if (invalidEmail) {
          return res.status(400).json({
            success: false,
            message: invalidEmail,
          });
        }

        let invalidPassword = await service.validatePassword(user.password);
        if (invalidPassword) {
          return res.status(400).json({
            success: false,
            message: invalidPassword,
          });
        }

        let userNameExists = await service.uniqueUserName(
          req.app.get("db"),
          user.user_name
        );
        if (userNameExists) {
          return res.status(400).json({
            status: false,
            message: "This username already exists. Please choose another.",
          });
        }

        let emailExists = await service.uniqueEmail(
          req.app.get("db"),
          user.email
        );
        if (emailExists) {
          return res.status(400).json({
            success: false,
            message:
              "An account associated with this email has already been created.",
          });
        }
        // then we hash password
        let hashpwd = await service.hashPassword(user.password);
        user.password = hashpwd;
        // then we insert the new user
        let insertedUser = await service.insertUser(req.app.get("db"), user);
        if (!insertedUser) {
          return res.status(500).json({
            success: false,
            message: "We're sorry. Our servers appear to be down :/",
          });
        }

        return res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${insertedUser.id}`))
          .json({
            success: true,
            message: "Congrats! Your sign-up was successful!",
            payload: service.serializeUser(insertedUser),
          });
      } catch (error) {
        next(error);
      }
    }

    const result = validateUser(newUser, usersService);
    result;
  });

/**
 * @desc GET public username stats
 * @route GET /api/users/public/:user_id
 * @access Public
 */
usersRouter
  .route("/public/:user_id")
  .all(checkUserExists)
  .get((req, res) => {
    return res.status(200).json({
      success: true,
      payload: usersService.serializeUsername(res.user),
    });
  });

/**
 * @desc GET + DELETE private user data
 * @route GET + DELETE /api/users/:user_id
 * @access Admin + Authenticated User
 */
usersRouter
  .route("/:user_id")
  .all(requireAuth)
  .all(checkUserExists)
  .get((req, res) => {
    if (req.user.id === res.user.id || req.user.admin) {
      return res.status(200).json({
        success: true,
        message: `Found user with id of ${req.user.id}.`,
        payload: usersService.serializeUser(res.user),
      });
    } else {
      return res.status(403).json({
        success: false,
        message:
          "This user cannot be found. Their info might have been modified or deleted.",
      });
    }
  })
  .delete((req, res, next) => {
    if (req.user.id === res.user.id || req.user.admin) {
      usersService
        .deleteUser(req.app.get("db"), res.user.id)
        .then((rowsAffected) => {
          return res.status(204).json();
        })
        .catch(next);
    } else {
      return res.status(403).json({
        success: false,
        message:
          "This user cannot be found. Their info might have been modified or deleted.",
      });
    }
  });

/**
 * USERS ROUTE MIDDLEWARE
 * ========================================
 */
async function checkUsersExist(req, res, next) {
  try {
    const users = await usersService.getUsers(req.app.get("db"));

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found.",
      });
    }

    res.users = users;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkUserExists(req, res, next) {
  try {
    const user = await usersService.getUserById(
      req.app.get("db"),
      req.params.user_id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "This user no longer exists.",
      });
    }

    res.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = usersRouter;
