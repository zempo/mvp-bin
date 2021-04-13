const express = require("express");
const path = require("path");
const { isWebUri } = require("valid-url");
const { requireAuth } = require("../middleware/jwtAuthMW");
const dashboardService = require("../services/dashboardService");
const cloudService = require("../services/cloudService");
const formData = require("express-form-data");
// Cloudinary
const cloudinary = require("cloudinary");
const {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require("../config").APIS.CLOUDINARY;
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
// -------------------

const dashboardRouter = express.Router();
// dashboardRouter.use(formData);
const bodyParser = express.json();

/**
 * @desc POST image to 3rd party cloud storage
 * @route /api/dashboard/images
 * @access Private
 */
dashboardRouter.route("/images").post(requireAuth, (req, res, next) => {
  // upload the files, first
  async function processImages(files, service) {
    try {
      const sizeError = await service.validateSize(files);
      if (sizeError) {
        return res.status(413).json({
          success: false,
          message: sizeError,
        });
      }

      const sendToCloud = await service.uploadByFilePath(files);
      if (sendToCloud.find((file) => file === "NSFW content added")) {
        return res.status(400).json({
          success: false,
          message: `Please provide an appropriate image.`,
        });
      }

      // console.log(sendToCloud);

      return res.location(req.originalUrl).send(sendToCloud);
    } catch (error) {
      next(error);
    }
  }
  const processedImages = processImages(req.files, cloudService);
  processedImages;
});

/**
 * @desc GET + POST cards of a user
 * @route /api/dashboard/cards/:user_id
 * @access Private
 */
dashboardRouter
  .route("/cards/:user_id")
  .all(requireAuth)
  .get(checkForPrivateCards, (req, res) => {
    if (req.user.id === res.cards[0]["user:id"]) {
      res.status(200).json({
        success: true,
        message: `Showing cards for user with id: "${req.params.user_id}"`,
        payload: dashboardService.serializeCards(res.cards),
      });
    } else {
      res.status(403).end();
    }
  })
  .post(bodyParser, (req, res, next) => {
    const {
      theme,
      front_message,
      front_image,
      inside_message,
      inside_image,
    } = req.body;

    const newCard = {
      theme,
      front_message,
      front_image,
      inside_message,
      inside_image,
    };

    async function validateCard(card, service) {
      try {
        const error = await service.postValidator(card);
        if (error) {
          return res.status(400).json({
            success: false,
            message: error,
          });
        }
        card.user_id = req.user.id;

        const sanitizeFront = await service.sanitizeCard(card.front_message);
        if (sanitizeFront) {
          card.front_message = sanitizeFront;
        }
        const sanitizeInside = await service.sanitizeCard(card.inside_message);
        if (sanitizeInside) {
          card.inside_message = sanitizeInside;
        }

        const insertedCard = await service.insertCard(req.app.get("db"), card);

        return res
          .status(201)
          .location(
            path.posix.join(req.originalUrl, `/${insertedCard[0]["id"]}`)
          )
          .json({
            success: true,
            message: `Inserted new card.`,
            payload: dashboardService.serializeCard(insertedCard[0]),
          });
      } catch (error) {
        next(error);
      }
    }

    const result = validateCard(newCard, dashboardService);
    result;
  });

/**
 * @desc GET + DELETE + PATCH a user's card
 * @route /api/dashboard/cards/:user_id/:card_id
 * @access Private
 */
dashboardRouter
  .route("/cards/:user_id/:card_id")
  .all(requireAuth)
  .all(checkCardStillPrivate)
  .get((req, res) => {
    if (req.user.id === res.card[0]["user:id"]) {
      res.status(200).json({
        success: true,
        message: `Showing card from user with id: ${req.params.user_id}`,
        payload: dashboardService.serializeCards(res.card),
      });
    } else {
      res.status(403).end();
    }
  })
  .delete((req, res, next) => {
    if (req.user.id === res.card[0]["user:id"]) {
      dashboardService
        .deleteCard(req.app.get("db"), req.params.card_id)
        .then((numberRowsAffected) => {
          res.status(204).end();
        })
        .catch(next);
    } else {
      res.status(403).end();
    }
  })
  .patch(bodyParser, (req, res, next) => {
    const {
      theme,
      front_message,
      front_image,
      inside_message,
      inside_image,
    } = req.body;

    const cardToUpdate = {
      theme,
      front_message,
      front_image,
      inside_message,
      inside_image,
    };
    const numberOfValues = Object.values(cardToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        success: false,
        message: `Please target at least 1 card property in the update.`,
      });
    }
    cardToUpdate.date_modified = new Date().toLocaleString();

    async function correctPatch(card, service) {
      try {
        const wrongUser = await service.correctUser(
          req.user.id,
          res.card[0]["user:id"]
        );
        if (wrongUser) {
          return res.status(403).json({
            success: false,
            message: wrongUser,
          });
        }

        const error = await service.patchValidator(card);
        if (error) {
          return res.status(400).json({
            success: false,
            message: error,
          });
        }
        // card.user_id = req.user.id;

        if (card.front_message != null) {
          const sanitizeFront = await service.sanitizeCard(card.front_message);
          card.front_message = sanitizeFront;
        }
        if (card.inside_message != null) {
          const sanitizeInside = await service.sanitizeCard(
            card.inside_message
          );
          card.inside_message = sanitizeInside;
        }

        const updatedCard = await service.updateCard(
          req.app.get("db"),
          req.params.card_id,
          card
        );
        if (!updatedCard) {
          return res.status(409).json({
            success: false,
            message: `Request timeout.`,
          });
        }

        return res.status(204).end();
      } catch (error) {
        next(error);
      }
    }

    const result = correctPatch(cardToUpdate, dashboardService);
    result;
  });

/**
 * @desc PATCH, but only publish an unpublished card
 * @route /api/dashboard/publish/:card_id
 * @access Private
 */
dashboardRouter
  .route("/publish/:card_id")
  .all(requireAuth)
  .all(checkCardStillPrivate)
  .patch(bodyParser, (req, res, next) => {
    // toggle a card's privacy
    const cardToUpdate = { public: "true" };

    if (req.user.id === res.card["user:id"]) {
      dashboardService
        .updateCard(req.app.get("db"), req.params.card_id, cardToUpdate)
        .then((numberRowsAffected) => {
          return res.status(204).end();
        })
        .catch(next);
    } else {
      res.status(403).end();
    }
  });

/**
 * ### DASHBOARD MIDDLEWARE
 */
async function checkForPrivateCards(req, res, next) {
  try {
    const cards = await dashboardService.getUserCards(
      req.app.get("db"),
      req.params.user_id
    );
    if (cards.length === 0)
      return res.status(404).json({
        success: false,
        message: `This user has no private cards at the moment.`,
      });

    res.cards = cards;
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * ### DASHBOARD MIDDLEWARE
 */
async function checkCardStillPrivate(req, res, next) {
  try {
    const card = await dashboardService.getUserCardsById(
      req.app.get("db"),
      req.params.user_id,
      req.params.card_id
    );
    if (card.length === 0)
      return res.status(404).json({
        success: false,
        message: `Can't access card. It might have been deleted or published.`,
      });

    res.card = card;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = dashboardRouter;
