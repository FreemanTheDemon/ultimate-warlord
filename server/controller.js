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
        // console.log(req.body);
        const {username, turn, units, production} = req.body;

        // query to set the turn (username table)
        sequelize.query(`
        UPDATE users
            SET turn = ${turn}
            WHERE username = '${username}';
        `).catch(err => console.log(err));

        sequelize.query(`
        SELECT id FROM users
            WHERE username = '${username}';
        `)
        .then(dbRes => {
            const { id } = dbRes[0][0];
            sequelize.query(`
            SELECT * FROM factions
                WHERE user_id = ${id};
            `).then(dbRes => {
                if (dbRes[0].length > 0) {
                    // if the user data already exists
                    for (let i = 0; i < 2; i++) {
                        let isTurn = false;
                        if (i === turn) {
                            isTurn = true;
                        }
                        sequelize.query(`
                        UPDATE factions
                            SET is_turn = ${isTurn}
                            WHERE team = ${i} AND user_id = ${id};
                        `)
                        .catch(err => console.log(err));
                    }
                } else {
                    // otherwise, insert new data
                    for (let i = 0; i < 2; i++) {
                        let isTurn = false;
                        if (i === turn) {
                            isTurn = true;
                        }
                        sequelize.query(`
                        INSERT INTO factions (team, user_id, is_turn)
                            VALUES (${i}, ${id}, ${isTurn});
                        `)
                        .catch(err => console.log(err));
                    }
                }
            })
            for (let i = 0; i < units.length; i++) {
                const { team, x, y } = units[i];
                const unit = units[i].units[0];
                const { movement, unique } = unit;
                const unitId = unit.id;
                sequelize.query(`
                SELECT * FROM unit_data
                    WHERE unique_id = ${unique};
                `).then(dbRes => {
                    if (dbRes[0].length > 0) {
                        // update the unit
                        sequelize.query(`
                        UPDATE unit_data
                            SET row = ${x}, col = ${y}, type = ${unitId}, movement = ${movement}, alignment = ${team}
                            WHERE unique_id = ${unique} AND user_id_unit_data = ${id};
                        `)
                        .catch(err => console.log(err));
                    } else {
                        // create a new unit
                        sequelize.query(`
                        INSERT INTO unit_data (unique_id, user_id_unit_data, row, col, type, movement, alignment)
                            VALUES (${unique}, ${id}, ${x}, ${y}, ${unitId}, ${movement}, ${team});
                        `)
                        .catch(err => console.log(err));
                    }
                })
            }
            sequelize.query(`
            SELECT * FROM production
                WHERE user_id_production = ${id};
            `).then(dbRes => {
                for (let i = 0; i < production.length; i++) {
                    // id, time, team
                    const productionId = production[i].id;
                    const { time, team } = production[i];
                    let idCheck = (i % 2)
                    if (idCheck === 0) {
                        idCheck++;
                    } else {
                        idCheck--;
                    }
                    if (dbRes[0].length > 0) {
                        // if the user data already exists
                        sequelize.query(`
                        UPDATE production
                            SET faction_id = ${team}, type = ${productionId}, turns_left = ${time}
                            WHERE user_id_production = ${id} AND id = ${idCheck};
                        `)
                        .catch(err => console.log(err));
                    } else {
                        // otherwise, insert new data
                        sequelize.query(`
                        INSERT INTO production (user_id_production, faction_id, type, turns_left)
                            VALUES (${id}, ${team}, ${productionId}, ${time});
                        `)
                        .catch(err => console.log(err));
                    }
                }
            })
        }).then(dbRes => res.sendStatus(200))
        .catch(err => console.log(err))
    },

    loadGame: (req, res) => {
        // select query for the id of the game_state associated with the username
        // chain? the query and make sure to get all the data with the same game state id foreign key
        // send a response back as a clean organized object
        const { username } = req.body

        let response = {};
        sequelize.query(`
        SELECT * 
            FROM factions
            WHERE user_id IN (SELECT id FROM users 
                WHERE username = '${username}');
        `).then(dbRes => {
            response.factions = dbRes[0];
            sequelize.query(`
            SELECT *
                FROM unit_data
                WHERE user_id_unit_data IN (SELECT id FROM users
                    WHERE username = '${username}');
            `).then(dbRes => {
                response.units = dbRes[0];
                sequelize.query(`
                SELECT *
                    FROM production
                    WHERE user_id_production IN (SELECT id FROM users
                        WHERE username = '${username}');
                `).then(dbRes => {
                    response.production = dbRes[0];
                    res.status(200).send(response);
                })
            })
        })
        .catch(err => console.log(err));
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
                sequelize.query(`
                SELECT *
                    FROM users
                    WHERE username = '${username}';
                `).then(dbRes => {
                    if (bcrypt.compareSync(password, dbRes[0][0].password)) {
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
                INSERT INTO users (username, password, turn)
                    VALUES ('${username}', '${passHash}', 0);
                `).then((dbRes) => {
                    console.log('User registered, procede to login.')
                    res.status(200).send(dbRes[0]);
                }).catch(err => console.log('error registering user', err));
            }
        }).catch(err => console.log(err));
    },

    seed: (req, res) => {
        sequelize.query(`
        DROP TABLE IF EXISTS production;
        DROP TABLE IF EXISTS unit_data;
        DROP TABLE IF EXISTS factions;
        DROP TABLE IF EXISTS users;

        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR,
            password VARCHAR,
            turn INTEGER
        );
          
        CREATE TABLE factions (
            id SERIAL PRIMARY KEY,
            team INTEGER,
            user_id INTEGER,
            is_turn BOOLEAN DEFAULT false,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
          
        CREATE TABLE unit_data (
            id SERIAL PRIMARY KEY,
            unique_id INTEGER,
            user_id_unit_data INTEGER,
            row INTEGER,
            col INTEGER,
            type INTEGER,
            movement INTEGER,
            alignment INTEGER,
            FOREIGN KEY (user_id_unit_data) REFERENCES users(id)
        );

        CREATE TABLE production (
            id SERIAL PRIMARY KEY,
            user_id_production INTEGER,
            faction_id INTEGER,
            type INTEGER,
            turns_left INTEGER,
            FOREIGN KEY (user_id_production) REFERENCES users(id)
        );
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err));
    }
}