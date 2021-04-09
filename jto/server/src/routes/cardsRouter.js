const express = require("express");

const { requireAuth } = require("../middleware/jwtAuthMW");
const cardsService = require("../services/cardsService");
const dashboardService = require("../services/dashboardService");
const cardRouter = express.Router();
const bodyParser = express.json();

/**
 * @desc GET all published cards
 * @route GET /api/gallery
 * @access Public
 */
cardRouter.route("/").get((req, res, next) => {
  cardsService
    .getAllCards(req.app.get("db"))
    .then((cards) => {
      res.status(200).json({
        success: true,
        message: "Showing all published cards",
        payload: cardsService.serializeCards(cards),
      });
    })
    .catch(next);
});

/**
 * @desc GET any particular card (published or otherwise) using its id
 * @route GET /api/gallery/any/:card_id
 * @access Public
 */
cardRouter
  .route("/any/:card_id")
  .all(checkAnyCardExists)
  .get((req, res) => {
    res.status(200).json({
      message: `Showing card with id: ${req.params.card_id}`,
      payload: cardsService.serializeCard(res.any_card),
    });
  });

/**
 * @desc GET + DELETE + PATCH any published card (given its id)
 * @route GET + DELETE + PATCH /api/gallery/:card_id
 * @access Public, Admin, Private
 */
cardRouter
  .route("/:card_id")
  .all(checkCardExists)
  .get((req, res) => {
    res.json({
      success: true,
      message: `Showing published card with id: "${req.params.card_id}"`,
      payload: cardsService.serializeCard(res.card),
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
        message: `Please include any of the following in the update: theme, front_message, front_image, inside_message, or inside_image`,
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
            message: "request timeout",
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
 * @route GET /api/gallery/comments/:card_id
 * @access Public
 */
cardRouter
  .route("/comments/:card_id")
  .all(checkCardExists)
  .get((req, res, next) => {
    cardsService
      .getCommentsByCard(req.app.get("db"), res.card["id"])
      .then((comments) => {
        res.status(200).json({
          message: `Showing card comments for card with id: "${res.card["id"]}"`,
          payload: cardsService.serializeCardComments(comments),
        });
      })
      .catch(next);
  });

/**
 * @desc PATCH a published card's to make it private
 * @route PATCH /api/gallery/unpublish/:card_id
 * @access Private
 */
cardRouter
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
 * GALLERY ROUTE MIDDLEWARE
 * ========================================
 */
async function checkCardExists(req, res, next) {
  try {
    const card = await cardsService.getPublicById(
      req.app.get("db"),
      req.params.card_id
    );

    if (!card) {
      return res.status(404).json({
        success: false,
        message: `This public card no longer exists. It might have been deleted or made private.`,
      });
    }

    res.card = card;
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * GALLERY ROUTE MIDDLEWARE
 * ========================================
 */
async function checkAnyCardExists(req, res, next) {
  try {
    const anyCard = await cardsService.getAnyById(
      req.app.get("db"),
      req.params.card_id
    );

    if (!anyCard) {
      return res.status(404).json({
        success: false,
        message: `This card no longer exists. It has been deleted.`,
      });
    }

    res.any_card = anyCard;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = cardRouter;
