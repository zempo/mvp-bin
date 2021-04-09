const express = require("express");
const { requireAuth } = require("../middleware/jwtAuthMW");
const commentsService = require("../services/commentsService");
const path = require("path");
// Set-up
const commentsRouter = express.Router();
const bodyParser = express.json();

/**
 * @desc POST new comment to a card
 * @route POST /api/comments
 * @access Private
 */
commentsRouter.route("/").post(requireAuth, bodyParser, (req, res, next) => {
  const { body, card_id } = req.body;
  let newComment = { body, card_id };

  newComment.user_id = req.user.id;

  async function validateComment(comment, service) {
    try {
      let missingKeys = await service.checkAllFields(comment);
      if (missingKeys)
        return res.status(400).json({
          success: false,
          message: missingKeys,
        });

      let filteredComment = await service.sanitizeComment(comment.body);
      if (filteredComment) {
        comment.body = filteredComment;
      }

      let insertedComment = await service.insertComment(
        req.app.get("db"),
        comment
      );
      if (!insertedComment)
        return res.status(409).json({
          success: false,
          message: "Request timeout.",
        });

      return res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${insertedComment.id}`))
        .json({
          success: true,
          message: `Created new comment.`,
          payload: service.serializeComment(insertedComment),
        });
    } catch (error) {
      next(error);
    }
  }

  const result = validateComment(newComment, commentsService);
  result;
});

/**
 * @desc GET + DELETE + PATCH a comment (given its id)
 * @route GET + DELETE + PATCH /api/comments/:comment_id
 * @access Private
 */
commentsRouter
  .route("/:comment_id")
  .all(requireAuth)
  .all(checkCommentExists)
  .get((req, res) => {
    // if you're an admin or the user, you can access a comment dialogue box (which has edit/delete)
    if (req.user.id === res.comment.user.id || req.user.admin) {
      res.json({
        success: true,
        message: `Showing comment with id: "${req.params.comment_id}".`,
        payload: commentsService.serializeComment(res.comment),
      });
    } else {
      res.status(403).end();
    }
  })
  .delete((req, res, next) => {
    if (req.user.id === res.comment.user.id || req.user.admin) {
      // res.json(commentsService.serializeComment(res.comment))
      commentsService
        .deleteComment(req.app.get("db"), req.params.comment_id)
        .then((numberRowsAffected) => {
          res.status(204).end();
        })
        .catch(next);
    } else {
      res.status(403).end();
    }
  })
  .patch(bodyParser, (req, res, next) => {
    const { body } = req.body;
    const commentToUpdate = { body };

    commentToUpdate.date_modified = new Date().toLocaleString();

    // console.log(commentsService.correctUser(req.user.id, res.comment.user.id));
    async function runPatch(comment, service) {
      try {
        let missingKeys = await service.checkAllFields(comment);
        if (missingKeys) {
          return res.status(400).json({
            success: false,
            message: missingKeys,
          });
        }

        const wrongUser = await service.correctUser(
          req.user.id,
          res.comment.user.id
        );
        if (wrongUser && !req.user.admin) {
          return res.status(403).json({
            success: false,
            message: wrongUser,
          });
        }

        const sanitizeComment = await service.sanitizeComment(comment.body);
        if (sanitizeComment) {
          comment.body = sanitizeComment;
        }

        const updatedComment = await service.updateComment(
          req.app.get("db"),
          req.params.comment_id,
          comment
        );
        if (!updatedComment) {
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

    const result = runPatch(commentToUpdate, commentsService);
    result;
  });

/**
 * ### COMMENTS MIDDLEWARE
 */
async function checkCommentExists(req, res, next) {
  try {
    const comment = await commentsService.getById(
      req.app.get("db"),
      req.params.comment_id
    );

    if (!comment)
      return res.status(404).json({
        success: false,
        message: `This comment no longer exists. It may have been moved or deleted.`,
      });

    res.comment = comment;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = commentsRouter;
