require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();

const port = process.env.PORT || 4004;
const { seed, login, register, saveGame, loadGame } = require('./controller');

app.use(express.json());
app.use(cors());

app.post('/login', login);
app.post('/register', register);
app.post('/save', saveGame);
app.post('/load', loadGame);

app.post('/seed', seed);

app.listen(port, () => console.log('Listening on', port));