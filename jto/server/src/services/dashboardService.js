const xss = require("xss");
const Treeize = require("treeize");
const { isWebUri } = require("valid-url");
const { HAS_SPACES, CARD_THEMES } = require("../config").REGEX;
const Filter = require("bad-words");
const filter = new Filter();

const dashboardService = {
  /**
   * NOTE:
   * if the user passes authentication,
   * then their id will be used to display their cards.
   * cards can only be public or private
   */
  getUserCards(db, user_id) {
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
        "card.date_modified",
        "card.public",
        ...userFields
      )
      .leftJoin("jto_users AS usr", "card.user_id", "usr.id")
      .where({
        "usr.id": user_id,
        "card.public": false,
      })
      .groupBy("card.id", "usr.id");
  },
  getUserCardsById(db, user_id, card_id) {
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
        "card.date_modified",
        "card.public",
        ...userFields
      )
      .leftJoin("jto_users AS usr", "card.user_id", "usr.id")
      .where({
        "card.id": card_id,
        "usr.id": user_id,
        "card.public": false,
      })
      .groupBy("card.id", "usr.id");
  },
  insertCard(db, newCard) {
    return db
      .insert(newCard)
      .into("jto_cards")
      .returning("*")
      .then(([card]) => {
        // console.log(card);
        return card;
      })
      .then((card) => {
        // console.log(card);
        return dashboardService.getDashById(db, card.user_id, card.id);
      });
  },
  deleteCard(db, id) {
    return db("jto_cards").where({ id }).delete();
  },
  updateCard(db, id, newCardFields) {
    return db("jto_cards").where({ id }).update(newCardFields);
  },
  postValidator(card) {
    const NO_ERRORS = null;

    for (const [key, value] of Object.entries(card)) {
      if (
        value == null &&
        (key === "theme" || key === "inside_message" || key === "front_message")
      ) {
        return `Missing '${key}' in request body. Images are not required.`;
      } else if (
        key === "theme" &&
        (CARD_THEMES.test(value) == false || HAS_SPACES.test(value) == false)
      ) {
        // console.log(CARD_THEMES.test(theme) == false);
        return `Please provide a valid theme for card.`;
      } else if (
        (key === "front_message" && value.length > 100) ||
        (key === "inside_message" && value.length > 650)
      ) {
        return `Front Message cannot exceed 100 characters in length. Inside message cannot exceed 650 characters.`;
      } else if (
        (key === "front_image" && value != null && !isWebUri(value)) ||
        (key === "inside_image" && value != null && !isWebUri(value))
      ) {
        return `Please provide a valid URL for card images.`;
      }
    }

    return NO_ERRORS;
  },
  patchValidator(card) {
    const NO_ERRORS = null;

    if (
      card.theme != null &&
      (CARD_THEMES.test(card.theme) == false ||
        HAS_SPACES.test(card.theme) == false)
    ) {
      return `Please provide a valid theme for card.`;
    } else if (card.front_message != null) {
      if (card.front_message.length > 100) {
        return `Front Message cannot exceed 100 characters in length. Inside message cannot exceed 650 characters.`;
      }
    } else if (card.inside_message != null) {
      if (card.inside_message.length > 650) {
        return `Front Message cannot exceed 100 characters in length. Inside message cannot exceed 650 characters.`;
      }
    } else if (card.front_image != null) {
      if (!isWebUri(card.front_image)) {
        return `Please make sure card images are a valid URL.`;
      }
    } else if (card.inside_image != null) {
      if (!isWebUri(card.inside_image)) {
        return `Please make sure card images are a valid URL.`;
      }
    }
    return NO_ERRORS;
  },
  correctUser(loggedInId, targetId) {
    const NO_ERRORS = null;
    if (loggedInId !== targetId) {
      return `User does not match card.`;
    }
    return NO_ERRORS;
  },
  serializeCards(cards) {
    return cards.map(this.serializeCard);
  },
  serializeCard(card) {
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
      date_modified: cardData.date_modified || null,
      public: cardData.public,
      user: cardData.user || {},
    };
  },
  sanitizeCard(str) {
    /**
     * Uses 'Bad-Words' package to filter out profanity.
     */
    return filter.clean(str);
  },
};

module.exports = dashboardService;
