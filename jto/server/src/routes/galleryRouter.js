const express = require("express");
const { requireAuth } = require("../middleware/jwtAuthMW");
const galleryService = require("../services/galleryService");
const dashboardService = require("../services/dashboardService");
// Set-up
const galleryRouter = express.Router();
const bodyParser = express.json();

/**
 * @desc GET all published cards
 * @route /api/gallery
 * @access Public
 */
galleryRouter.route("/").get((req, res, next) => {
  galleryService
    .getPublicCards(req.app.get("db"))
    .then((cards) => {
      res.status(200).json({
        success: true,
        message: "Showing all published cards.",
        payload: galleryService.serializeCards(cards),
      });
    })
    .catch(next);
});

/**
 * @desc GET any particular card (published or otherwise) using its id
 * @route /api/gallery/any/:card_id
 * @access Public
 */
galleryRouter
  .route("/any/:card_id")
  .all(checkAnyCardExists)
  .get((req, res) => {
    res.status(200).json({
      success: true,
      message: `Showing card with id of ${req.params.card_id}.`,
      payload: galleryService.serializeCard(res.any_card),
    });
  });

/**
 * @desc GET + DELETE + PATCH any published card (given its id)
 * @route /api/gallery/:card_id
 * @access Public, Admin, Private
 */
galleryRouter
  .route("/:card_id")
  .all(checkCardExists)
  .get((req, res) => {
    res.json({
      success: true,
      message: `Showing published card with id of ${req.params.card_id}.`,
      payload: galleryService.serializeCard(res.card),
    });
  })
  .delete(requireAuth, (req, res, next) => {
    /**
     * ADMIN-ONLY DELETION
     */
    if (req.user.admin) {
      dashboardService
        .deleteCard(req.app.get("db"), res.card["id"])
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

    async function validPatch(card, service) {
      try {
        const error = await service.patchValidator(card);
        if (error)
          return res.status(400).json({
            success: false,
            message: error,
          });

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
            message: "Request timeout.",
          });
        }

        return res.status(204).end();
      } catch (error) {
        next(error);
      }
    }

    const result = validPatch(cardToUpdate, dashboardService);
    result;
  });

/**
 * @desc GET a published card's comments, using card id
 * @route /api/gallery/comments/:card_id
 * @access Public
 */
galleryRouter
  .route("/comments/:card_id")
  .all(checkCardExists)
  .get((req, res, next) => {
    galleryService
      .getCommentsByCard(req.app.get("db"), res.card["id"])
      .then((comments) => {
        res.status(200).json({
          success: true,
          message: `Showing card comments for card with id of ${res.card["id"]}.`,
          payload: galleryService.serializeCardComments(comments),
        });
      })
      .catch(next);
  });

/**
 * @desc PATCH, but only to unpublish a published card.
 * @route /api/gallery/unpublish/:card_id
 * @access Private
 */
galleryRouter
  .route("/unpublish/:card_id")
  .all(requireAuth)
  .all(checkCardExists)
  .patch(bodyParser, (req, res, next) => {
    // toggle a card's privacy
    const cardToUpdate = { public: "false" };

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
 * ### GALLERY MIDDLEWARE
 */
async function checkCardExists(req, res, next) {
  try {
    const card = await galleryService.getPublicById(
      req.app.get("db"),
      req.params.card_id
    );

    if (!card) {
      return res.status(404).json({
        success: false,
        message: `This public card no longer exists. It might have been deleted or unpublished.`,
      });
    }

    res.card = card;
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * ### GALLERY MIDDLEWARE
 */
async function checkAnyCardExists(req, res, next) {
  try {
    const anyCard = await galleryService.getAnyById(
      req.app.get("db"),
      req.params.card_id
    );

    if (!anyCard) {
      return res.status(404).json({
        success: false,
        message: `This card no longer exists. It may have been deleted.`,
      });
    }

    res.any_card = anyCard;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = galleryRouter;
