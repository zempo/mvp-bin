const express = require("express");
const { requireAuth } = require("../middleware/jwtAuthMW");
const actionsService = require("../services/actionsService");
// Setup
const actionsRouter = express.Router();
const bodyParser = express.json();

/**
 * @desc GET actions for all cards
 * @route /api/actions
 * @access Public
 */
actionsRouter.route("/").get((req, res, next) => {
  actionsService.getActions(req.app.get("db")).then((cards) => {
    res
      .status(200)
      .json({
        success: true,
        payload: actionsService.serializeActions(cards),
      })
      .catch(next);
  });
});

/**
 * @desc GET a card's actions
 * @route /api/actions/:card_id
 * @access Public
 */
actionsRouter
  .route("/:card_id")
  .all(checkCardExists)
  .get((req, res) => {
    res.status(200).json({
      success: true,
      payload: actionsService.serializeActionCount(res.card),
    });
  });

/**
 * @desc GET + PATCH + POST a card's likes
 * @route /api/actions/likes/:card_id
 * @access Private
 */
actionsRouter
  .route("/likes/:card_id")
  .all(requireAuth)
  .get(matchedActions, (req, res, next) => {
    /**
     * If you get a card, do a post
     * Else, do a patch
     *
     * Optimize on front end
     */
    res.send(res.action).end();
  })
  .patch(checkUserActed, bodyParser, (req, res, next) => {
    /**
     * If res.action, do PATCH
     * Else do POST
     * console.log(res.action[0])
     */
    const { id, action_liked } = res.action[0];
    if (action_liked === true) {
      const updatedAction = { action_liked: "false" };

      actionsService
        .updateActions(req.app.get("db"), id, updatedAction)
        .then((numRowsAffected) => {
          return res.status(204).end();
        })
        .catch(next);
    } else {
      const updatedAction = { action_liked: "true" };

      actionsService
        .updateActions(req.app.get("db"), id, updatedAction)
        .then((numRowsAffected) => {
          return res.status(204).end();
        })
        .catch(next);
    }
  })
  .post(checkUserActedOnce, bodyParser, (req, res, next) => {
    /**
     * If res.action, do PATCH
     * Else do POST
     * let { action_liked } = req.body;
     */
    let newAction = { action_liked: "true" };
    newAction.user_id = req.user.id;
    newAction.card_id = Number(req.params.card_id);

    actionsService
      .insertAction(req.app.get("db"), newAction)
      .then((action) => {
        res.status(201).json(action).end();
      })
      .catch(next);
  });

/**
 * @desc GET + PATCH + POST a card's saves
 * @route /api/actions/saves/:card_id
 * @access Private
 */
actionsRouter
  .route("/saves/:card_id")
  .all(requireAuth)
  .get(matchedActions, (req, res, next) => {
    /**
     * If you get a card, do a post
     * Else, do a patch
     *
     * Optimize on front end
     */
    res.send(res.action).end();
  })
  .patch(checkUserActed, bodyParser, (req, res, next) => {
    /**
     * If res.action, do PATCH
     * Else do POST
     * console.log(res.action[0])
     */
    const { id, action_saved } = res.action[0];
    if (action_saved === true) {
      const updatedAction = { action_saved: "false" };

      actionsService
        .updateActions(req.app.get("db"), id, updatedAction)
        .then((numRowsAffected) => {
          return res.status(204).end();
        })
        .catch(next);
    } else {
      const updatedAction = { action_saved: "true" };

      actionsService
        .updateActions(req.app.get("db"), id, updatedAction)
        .then((numRowsAffected) => {
          return res.status(204).end();
        })
        .catch(next);
    }
  })
  .post(checkUserActedOnce, bodyParser, (req, res, next) => {
    /**
     * If res.action, do PATCH
     * Else do POST
     * let { action_saved } = req.body;
     */
    let newAction = { action_saved: "true" };
    newAction.user_id = req.user.id;
    newAction.card_id = Number(req.params.card_id);

    actionsService
      .insertAction(req.app.get("db"), newAction)
      .then((action) => {
        res
          .status(201)
          .json({
            success: true,
            message: `Created new card action set.`,
            payload: action,
          })
          .end();
      })
      .catch(next);
  });

/**
 * ### ACTIONS MIDDLEWARE
 */
async function checkUserActed(req, res, next) {
  try {
    const card = await actionsService.getCardActions(
      req.app.get("db"),
      req.params.card_id
    );
    if (!card) {
      return res.status(404).json({
        success: false,
        message: `This card's actions are unavailable. The card might have been moved or deleted.`,
      });
    }

    const action = await actionsService.matchAction(
      req.app.get("db"),
      req.params.card_id,
      req.user.id
    );

    if (action.length === 0)
      return res.status(403).json({
        success: false,
        message: `Can't update action unless it is posted and references BOTH logged-in user AND card.`,
      });

    res.action = action;
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * ### ACTIONS MIDDLEWARE
 */
async function checkUserActedOnce(req, res, next) {
  try {
    const card = await actionsService.getCardActions(
      req.app.get("db"),
      req.params.card_id
    );
    if (!card) {
      return res.status(404).json({
        success: false,
        message: `This card's actions are unavailable. The card might have been moved or deleted.`,
      });
    }

    const action = await actionsService.matchAction(
      req.app.get("db"),
      req.params.card_id,
      req.user.id
    );

    if (action.length > 0)
      return res.status(400).json({
        success: false,
        message: `Can't post action more than once.`,
      });

    res.action = action;
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * ### ACTIONS MIDDLEWARE
 */
async function matchedActions(req, res, next) {
  try {
    const card = await actionsService.getCardActions(
      req.app.get("db"),
      req.params.card_id
    );
    if (!card) {
      return res.status(404).json({
        success: false,
        message: `This card's actions are unavailable. The card might have been moved or deleted.`,
      });
    }
    const action = await actionsService.matchAction(
      req.app.get("db"),
      req.params.card_id,
      req.user.id
    );

    res.action = action;
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * ### ACTIONS MIDDLEWARE
 */
async function checkCardExists(req, res, next) {
  try {
    const card = await actionsService.getCardActions(
      req.app.get("db"),
      req.params.card_id
    );

    if (!card) {
      return res.status(404).json({
        success: false,
        message: `This card's actions are unavailable. The card might have been moved or deleted.`,
      });
    }

    res.card = card;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = actionsRouter;
