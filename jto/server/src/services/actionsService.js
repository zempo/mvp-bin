const xss = require("xss");
const Treeize = require("treeize");

const actionsService = {
  getReactions(db) {
    return db
      .from("jto_cards AS card")
      .select(
        "card.id",
        "card.theme",
        "card.front_message",
        "card.front_image",
        "card.inside_message",
        "card.inside_image",
        "card.date_created",
        "card.user_id",
        "card.public",
        db.raw(`count(nullif(actions.react_liked, false)) AS number_of_likes`),
        db.raw(`count(nullif(actions.react_saved, false)) AS number_of_saves`)
      )
      .leftJoin("jto_actions AS actions", "actions.card_id", "card.id")
      .where("card.public", true)
      .groupBy("card.id")
      .orderBy("card.id");
  },
  getCardReactions(db, id) {
    return ReactionsService.getPublicReactions(db).where("card.id", id).first();
  },
  matchReaction(db, card_id, user_id) {
    return db
      .from("jto_actions AS actions")
      .select("*")
      .where({ "actions.card_id": card_id, "actions.user_id": user_id });
  },
  insertReaction(db, newReaction) {
    return db
      .insert(newReaction)
      .into("jto_actions")
      .returning("*")
      .then(([reaction]) => {
        return reaction;
      })
      .then((reaction) => {
        return ReactionsService.matchReaction(
          db,
          reaction.card_id,
          reaction.user_id
        );
      });
  },
  updateReactions(db, id, newFields) {
    return db.from("jto_actions").where({ id }).update(newFields);
  },
  serializeReactions(cards) {
    return cards.map(this.serializeReactionCount);
  },
  serializeReactionCount(card) {
    const cardTree = new Treeize();

    const cardData = cardTree.grow([card]).getData()[0];

    return {
      id: cardData.id,
      theme: cardData.theme,
      front_message: xss(cardData.front_message),
      front_image: xss(cardData.front_image),
      inside_message: xss(cardData.inside_message),
      inside_image: xss(cardData.inside_image),
      date_created: cardData.date_created,
      user_id: card.user_id,
      public: cardData.public,
      number_of_likes: Number(cardData.number_of_likes) || 0,
      number_of_saves: Number(cardData.number_of_saves) || 0,
    };
  },
  serializeQueriedReaction(reaction) {
    const cardTree = new Treeize();

    const reactionData = cardTree.grow([reaction]).getData()[0];

    return {
      card_id: reactionData.card_id,
      user_id: reactionData.user_id,
      likes: reactionData.likes,
      saves: reactionData.saves,
    };
  },
};

module.exports = actionsService;
