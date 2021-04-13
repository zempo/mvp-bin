const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return [
    {
      id: 1,
      admin: true,
      user_name: "test-user-1",
      full_name: "Test User One",
      password: "password",
      email: "test1@email.com",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
    },
    {
      id: 2,
      admin: false,
      user_name: "test-user-2",
      full_name: "Test User Two",
      password: "password",
      email: "test2@email.com",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
    },
    {
      id: 3,
      admin: false,
      user_name: "test-user-3",
      full_name: "Test User Three",
      password: "password",
      email: "test3@email.com",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
    },
    {
      id: 4,
      admin: false,
      user_name: "test-user-4",
      full_name: "Test User Four",
      password: "password",
      email: "test4@email.com",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
    },
    {
      id: 5,
      admin: false,
      user_name: "test-user-5",
      full_name: "Test User Five",
      password: "password",
      email: "test5@email.com",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
    },
  ];
}

function makeCardsArray(users) {
  return [
    {
      id: 1,
      theme: "cursive-plus",
      front_message: "Greeting 1",
      front_image: "https://loremflickr.com/g/500/400/flowers",
      inside_message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?",
      inside_image: "https://loremflickr.com/g/300/300/flowers",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
      public: true,
      user_id: users[1].id,
    },
    {
      id: 2,
      theme: "indie",
      front_message: "Greeting 2",
      front_image: "https://loremflickr.com/g/500/400/flowers",
      inside_message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?",
      inside_image: "https://loremflickr.com/g/300/300/flowers",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
      public: true,
      user_id: users[2].id,
    },
    {
      id: 3,
      theme: "cursive-plus",
      front_message: "Greeting 3",
      front_image: "https://loremflickr.com/g/500/400/flowers",
      inside_message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?",
      inside_image: "https://loremflickr.com/g/300/300/flowers",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
      public: false,
      user_id: users[0].id,
    },
    {
      id: 4,
      theme: "cursive-plus",
      front_message: "Greeting 4",
      front_image: "https://loremflickr.com/g/500/400/flowers",
      inside_message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?",
      inside_image: "https://loremflickr.com/g/300/300/flowers",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
      public: false,
      user_id: users[0].id,
    },
    {
      id: 5,
      theme: "cursive-plus",
      front_message: "Greeting 5",
      front_image: "https://loremflickr.com/g/500/400/flowers",
      inside_message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?",
      inside_image: "https://loremflickr.com/g/300/300/flowers",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
      public: true,
      user_id: users[0].id,
    },
    {
      id: 6,
      theme: "cursive-plus",
      front_message: "Greeting 6",
      front_image: "https://loremflickr.com/g/500/400/flowers",
      inside_message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?",
      inside_image: "https://loremflickr.com/g/300/300/flowers",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
      public: true,
      user_id: users[3].id,
    },
    {
      id: 7,
      theme: "kiddo",
      front_message: "Greeting 7",
      front_image: "https://loremflickr.com/g/500/400/flowers",
      inside_message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?",
      inside_image: "https://loremflickr.com/g/300/300/flowers",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
      public: true,
      user_id: users[3].id,
    },
    {
      id: 8,
      theme: "cursive-plus",
      front_message: "Greeting 3",
      front_image: "https://loremflickr.com/g/500/400/flowers",
      inside_message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?",
      inside_image: "https://loremflickr.com/g/300/300/flowers",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
      public: false,
      user_id: users[2].id,
    },
  ];
}

function makeCommentsArray(users, cards) {
  return [
    {
      id: 1,
      body: "comment 1",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
      user_id: users[0].id,
      card_id: cards[1].id,
    },
    {
      id: 2,
      body: "comment 2",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
      user_id: users[1].id,
      card_id: cards[1].id,
    },
    {
      id: 3,
      body: "comment 3",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
      user_id: users[3].id,
      card_id: cards[0].id,
    },
    {
      id: 4,
      body: "comment 4",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
      user_id: users[2].id,
      card_id: cards[4].id,
    },
    {
      id: 5,
      body: "comment 5",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
      user_id: users[2].id,
      card_id: cards[5].id,
    },
    {
      id: 6,
      body: "comment 6",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
      user_id: users[2].id,
      card_id: cards[2].id,
    },
    {
      id: 7,
      body: "comment 7",
      date_created: "2029-01-22T16:28:32.615Z",
      date_modified: "2029-01-22T16:28:32.615Z",
      user_id: users[0].id,
      card_id: cards[3].id,
    },
  ];
}

function makeActionsArray(users, cards) {
  return [
    {
      id: 1,
      user_id: users[0].id,
      card_id: cards[1].id,
      action_liked: false,
      action_saved: true,
    },
    {
      id: 2,
      user_id: users[1].id,
      card_id: cards[1].id,
      action_liked: true,
      action_saved: true,
    },
    {
      id: 3,
      user_id: users[3].id,
      card_id: cards[0].id,
      action_liked: false,
      action_saved: false,
    },
    {
      id: 4,
      user_id: users[2].id,
      card_id: cards[4].id,
      action_liked: false,
      action_saved: true,
    },
    {
      id: 5,
      user_id: users[2].id,
      card_id: cards[5].id,
      action_liked: true,
      action_saved: true,
    },
    {
      id: 6,
      user_id: users[3].id,
      card_id: cards[2].id,
      action_liked: false,
      action_saved: true,
    },
    {
      id: 7,
      user_id: users[0].id,
      card_id: cards[3].id,
      action_liked: true,
      action_saved: true,
    },
  ];
}

function makeExpectedCard(users, card, comments = []) {
  const usr = users.find((u) => u.id === card.user_id);

  const cardComments = comments.filter((c) => c.card_id === card.id);

  const number_of_comments = cardComments.length;

  return {
    id: card.id,
    theme: card.theme,
    front_message: card.front_message,
    front_image: card.front_image,
    inside_message: card.inside_message,
    inside_image: card.inside_image,
    date_created: card.date_created,
    date_modified: card.date_modified,
    public: card.public,
    user: {
      id: usr.id,
      admin: usr.admin,
      user_name: usr.user_name,
      date_created: usr.date_created,
      date_modified: usr.date_modified,
    },
    number_of_comments,
  };
}

function makeMaliciousCard(user) {
  const maliciousCard = {
    id: 666,
    theme: "kiddo",
    front_image: "http://placehold.it/500x500",
    front_message: `Hacky-sack <script>alert("we are anonymous");</script>`,
    inside_image: "http://placehold.it/500x500",
    inside_message: `Evil greetings! <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. Hackity Sax`,
    date_created: new Date().toISOString(),
    date_modified: "2029-01-22T16:28:32.615Z",
    user_id: user.id,
    public: true,
  };
  const expectedCard = {
    ...makeExpectedCard([user], maliciousCard),
    front_message: `Hacky-sack &lt;script&gt;alert("we are anonymous");&lt;/script&gt;`,
    inside_message: `Evil greetings! <img src="https://url.to.file.which/does-not.exist">. Hackity Sax`,
  };
  return {
    maliciousCard,
    expectedCard,
  };
}

function makeExpectedDashCard(users, card) {
  const usr = users.find((user) => user.id === card.user_id);
  return {
    id: card.id,
    theme: card.theme,
    front_message: card.front_message,
    front_image: card.front_image,
    inside_message: card.inside_message,
    inside_image: card.inside_image,
    date_created: card.date_created,
    date_modified: card.date_modified,
    public: card.public,
    user: {
      id: usr.id,
      user_name: usr.user_name,
      date_created: usr.date_created,
      date_modified: usr.date_modified,
    },
  };
}

function makeExpectedComments(users, comment_id, comments) {
  const expectedComments = comments.filter(
    (comment) => comment.id === comment_id
  );

  return expectedComments.map((comment) => {
    let commentUser = users.filter((usr) => usr.id === comment.user_id)[0];
    return {
      id: comment.id,
      body: comment.body,
      date_created: comment.date_created,
      date_modified: comment.date_modified,
      card_id: comment.card_id,
      user: {
        id: commentUser.id,
        admin: commentUser.admin,
        user_name: commentUser.user_name,
        date_created: commentUser.date_created.substr(
          0,
          commentUser.date_created.length - 1
        ),
        date_modified: commentUser.date_modified,
      },
    };
  });
}

function makeExpectedCardComments(card_id, comments, users) {
  const expectedComments = comments.filter(
    (comment) => comment.card_id === card_id
  );

  return expectedComments.map((comment) => {
    let commentUser = users.filter((usr) => usr.id === comment.user_id)[0];
    return {
      id: comment.id,
      body: comment.body,
      date_created: comment.date_created,
      date_modified: comment.date_modified,
      card_id: comment.card_id,
      user: {
        id: commentUser.id,
        admin: commentUser.admin,
        user_name: commentUser.user_name,
        date_created: commentUser.date_created,
        date_modified: commentUser.date_modified,
      },
    };
  });
}

function makeExpectedActions(card, actions = []) {
  const likes = actions.filter((action) => {
    // console.log(action)
    if (action.card_id === card.id && action.action_liked) {
      return true;
    }
  });
  const saves = actions.filter((action) => {
    if (action.card_id === card.id && action.action_saved) {
      return true;
    }
  });
  const number_of_likes = likes.length;
  const number_of_saves = saves.length;

  return {
    id: card.id,
    theme: card.theme,
    front_message: card.front_message,
    front_image: card.front_image,
    inside_message: card.inside_message,
    inside_image: card.inside_image,
    date_created: card.date_created,
    user_id: card.user_id,
    public: card.public,
    number_of_likes,
    number_of_saves,
  };
}

function makeExpectedActionsByUser(card_id, user_id, actions) {
  const expectedByCardAndUser = actions.filter(
    (action) => action.card_id === card_id && action.user_id === user_id
  );

  return expectedByCardAndUser.map((action) => {
    return {
      id: action.id,
      card_id: action.card_id,
      user_id: action.user_id,
      action_liked: action.action_liked,
      action_saved: action.action_saved,
    };
  });
}

function makeJtoFixtures() {
  const testUsers = makeUsersArray();
  const testCards = makeCardsArray(testUsers);
  const testComments = makeCommentsArray(testUsers, testCards);
  const testActions = makeActionsArray(testUsers, testCards);

  return { testUsers, testCards, testComments, testActions };
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
          jto_actions,
          jto_comments,
          jto_cards,
          jto_users
          RESTART IDENTITY CASCADE`
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  }));
  // console.log(preppedUsers);
  // .insert(preppedUsers) into the users db
  return db
    .into("jto_users")
    .insert(preppedUsers)
    .then(() =>
      db.raw(`SELECT setVal('jto_users_id_seq', ?)`, [
        users[users.length - 1].id,
      ])
    );
}

function seedCardsTables(db, users, cards, comments = [], actions = []) {
  return db
    .transaction(async (trx) => {
      await seedUsers(trx, users);
      await trx.into("jto_cards").insert(cards);
      await trx.raw(`SELECT setval('jto_cards_id_seq', ?)`, [
        cards[cards.length - 1].id,
      ]);
    })
    .then(() => comments.length && db.into("jto_comments").insert(comments))
    .then(() => actions.length && db.into("jto_actions").insert(actions));
}

function seedCardsTables2(db, users, cards, comments = [], actions = []) {
  return db.transaction(async (trx) => {
    await seedUsers(trx, users);
    await trx.into("jto_cards").insert(cards);
    await trx.raw(`SELECT setval('jto_cards_id_seq', ?)`, [
      cards[cards.length - 1].id,
    ]);
    await trx.into("jto_comments").insert(comments);
    await trx.raw(`SELECT setval('jto_comments_id_seq', ?)`, [
      comments[comments.length - 1].id,
    ]);
    await trx.into("jto_actions").insert(actions);
    await trx.raw(`SELECT setval('jto_actions_id_seq', ?)`, [
      actions[actions.length - 1].id,
    ]);
  });
}

function seedMaliciousCard(db, user, card) {
  return seedUsers(db, [user]).then(() => db.into("jto_cards").insert(card));
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.email,
    algorithm: "HS256",
  });
  // console.log(token)
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeCardsArray,
  makeExpectedCard,
  makeMaliciousCard,
  makeExpectedDashCard,
  makeExpectedComments,
  makeExpectedCardComments,
  makeExpectedActions,
  makeExpectedActionsByUser,
  makeCommentsArray,
  makeActionsArray,
  makeJtoFixtures,
  cleanTables,
  seedUsers,
  seedCardsTables,
  seedCardsTables2,
  seedMaliciousCard,
  makeAuthHeader,
};
