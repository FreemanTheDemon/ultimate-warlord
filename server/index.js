require('dotenv').config();
const express = require(express);
const cors = require('cors')
const app = express();

const port = process.env.PORT || 4004;
const ctrl = require('./controller');

app.use(express.json());
app.use(cors());



app.listen(port, () => console.log('Listening on', port));