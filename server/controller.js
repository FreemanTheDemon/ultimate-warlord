const bcrypt = require('bcryptjs');
require('dotenv').config();
const Sequelize = require('sequelize');
const {CONNECTION_STRING} = process.env;
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    saveGame: (req, res) => {
        // there will be a lot of data in the req.body of this function
        // insert into the game state sub tables
        // if there is already a game with the same name, update instead of insert
    },

    loadGame: (req, res) => {
        // select query for the id of the game_state associated with the username
        // chain? the query and make sure to get all the data with the same game state id foreign key
        // send a response back as a clean organized object
    },

    login: (req, res) => {
        const { username, password } = req.body;

        sequelize.query(`
        SELECT username
            FROM users
            WHERE username = '${username}';
        `).then(dbRes => {
            if (dbRes[0].length > 0) {
                // username exists
                console.log(dbRes[0][0].username, username);
                sequelize.query(`
                SELECT *
                    FROM users
                    WHERE username = '${username}';
                `).then(dbRes => {
                    if (bcrypt.compareSync(password, dbRes[0][0].password)) {
                        console.log(dbRes[0]);
                        res.status(200).send(dbRes[0]);
                    } else {
                        res.status(400).send("Incorrect password.");
                    }
                }).catch(err => console.log('Password login error', err));
            } else {
                // username doesn't exist
                res.status(400).send("Username not found.");
            }
        }).catch(err => console.log(err));
    },

    register: (req, res) => {
        const { username, password } = req.body;
        let salt = bcrypt.genSaltSync(5);
        let passHash = bcrypt.hashSync(password, salt);

        sequelize.query(`
        SELECT username
            FROM users
            WHERE username = '${username}';
        `).then(dbRes => {
            if (dbRes[0].length > 0) {
                // username exists
                res.status(400).send('Username taken!');
            } else {
                sequelize.query(`
                INSERT INTO users (username, password)
                    VALUES ('${username}', '${passHash}');
                `).then((dbRes) => {
                    console.log('User registered, procede to login.')
                    res.status(200).send(dbRes[0]);
                }).catch(err => console.log('error registering user', err));
            }
        }).catch(err => console.log(err));
    },

    seed: (req, res) => {
        sequelize.query(`
        DROP TABLE IF EXISTS items;
        DROP TABLE IF EXISTS production;
        DROP TABLE IF EXISTS unit_data;
        DROP TABLE IF EXISTS factions;
        DROP TABLE IF EXISTS game_state;
        DROP TABLE IF EXISTS users;

        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR,
            password VARCHAR
        );
          
        CREATE TABLE game_state (
            id SERIAL PRIMARY KEY,
            user_id INTEGER,
            name VARCHAR(10),
            turn INTEGER,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
          
        CREATE TABLE factions (
            id SERIAL PRIMARY KEY,
            game_state_id INTEGER,
            name VARCHAR(15),
            gold INTEGER,
            is_turn BOOLEAN DEFAULT false,
            is_human BOOLEAN,
            FOREIGN KEY (game_state_id) REFERENCES game_state(id)
        );
          
        CREATE TABLE unit_data (
            id SERIAL PRIMARY KEY,
            game_state_id INTEGER,
            row INTEGER,
            col INTEGER,
            type INTEGER,
            name VARCHAR(15),
            movement INTEGER,
            alignment INTEGER,
            is_defending BOOLEAN,
            FOREIGN KEY (game_state_id) REFERENCES game_state(id),
            FOREIGN KEY (alignment) REFERENCES factions(id)
        );

        CREATE TABLE production (
            id SERIAL PRIMARY KEY,
            game_state_id INTEGER,
            faction_id INTEGER,
            type INTEGER,
            turns_left INTEGER,
            FOREIGN KEY (game_state_id) REFERENCES game_state(id),
            FOREIGN KEY (faction_id) REFERENCES factions(id)
        );
          
        CREATE TABLE items (
            id SERIAL PRIMARY KEY,
            unit_data_id INTEGER,
            item_name VARCHAR(15),
            FOREIGN KEY (unit_data_id) REFERENCES unit_data(id)
        );

        INSERT INTO users (username, password)
        VALUES ('testuser', 'testpass');
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err));
    }
}