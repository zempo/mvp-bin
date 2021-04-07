const xss = require("xss");
const Filter = require("bad-words");
const filter = new Filter();

const commentsService = {
  getById(db, id) {
    return db
      .from("jto_comments AS comment")
      .select(
        "comment.id",
        "comment.body",
        "comment.date_created",
        "comment.date_modified",
        "comment.card_id",
        db.raw(
          `row_to_json(
                        (SELECT tmp FROM (
                            SELECT
                            usr.id,
                            usr.admin,
                            usr.user_name,
                            usr.date_created,
                            usr.date_modified
                        ) tmp)
                    ) AS "user"`
        )
      )
      .leftJoin("jto_users AS usr", "comment.user_id", "usr.id")
      .where("comment.id", id)
      .first();
  },
  insertComment(db, newComment) {
    return db
      .insert(newComment)
      .into("jto_comments")
      .returning("*")
      .then(([comment]) => {
        // console.log(comment)
        return comment;
      })
      .then((comment) => {
        // console.log(comment["id"])
        return CommentsService.getById(db, comment.id);
      });
  },
  deleteComment(db, id) {
    return db("jto_comments").where({ id }).delete();
  },
  updateComment(db, id, newCommentFields) {
    return db("jto_comments").where({ id }).update(newCommentFields);
  },
  serializeComment(comment) {
    return {
      id: comment.id,
      body: xss(comment.body),
      card_id: comment.card_id,
      date_created: comment.date_created,
      date_modified: comment.date_modified,
      user: comment.user || {},
    };
  },
  checkAllFields(comment) {
    for (const [key, value] of Object.entries(comment)) {
      if (value == null) {
        return `Missing required '${key}' to create new comment`;
      }
    }
    // if loops through and finds all keys
    return null;
  },
  setId(comment, id) {
    return (comment.user_id = id);
  },
  correctUser(loggedInId, targetId) {
    const NO_ERRORS = null;
    if (loggedInId !== targetId) {
      return {
        error: `User does not match card`,
      };
    }
    return NO_ERRORS;
  },
  sanitizeComment(str) {
    /**
     * Uses 'Bad-Words' package to filter out profanity.
     */
    return filter.clean(str);
  },
};

module.exports = commentsService;
