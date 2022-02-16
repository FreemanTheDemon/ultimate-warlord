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
    seed: (req, res) => {
        sequelize.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS game_state;
        DROP TABLE IF EXISTS factions;
        DROP TABLE IF EXISTS unit_data;
        DROP TABLE IF EXISTS items;

        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username INTEGER,
            password VARCHAR
          );
          
          CREATE TABLE game_state (
            id SERIAL PRIMARY KEY,
            user_id INTEGER,
            name VARCHAR(10),
            FOREIGN KEY (user_id) REFERENCES users(id)
          );
          
          CREATE TABLE factions (
            id SERIAL PRIMARY KEY,
            game_state_id INTEGER,
            name VARCHAR(15),
            gold INTEGER,
            is_turn BOOLEAN DEFAULT false,
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
            FOREIGN KEY (game_state_id) REFERENCES game_state(id),
            FOREIGN KEY (alignment) REFERENCES factions(id)
          );
          
          CREATE TABLE items (
            id SERIAL PRIMARY KEY,
            unit_data_id INTEGER,
            item_name VARCHAR(15),
            FOREIGN KEY (unit_data_id) REFERENCES unit_data(id)
          );
        `)
    }
}