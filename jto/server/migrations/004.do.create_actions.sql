CREATE TABLE jto_actions (
    id SERIAL PRIMARY KEY,
    card_id INTEGER REFERENCES jto_cards(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER REFERENCES jto_users(id) ON DELETE CASCADE NOT NULL,
    action_liked boolean DEFAULT FALSE,
    action_saved boolean DEFAULT FALSE
);