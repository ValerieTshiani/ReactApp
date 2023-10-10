const express = require('express');
const cors = require ('cors')
const bodyParser = require('body-parser');
const router = require('./routes/router.js');
//const pool = require ('./config/db.js')
require('dotenv/config');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use('/',router)

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
//app.get('/', (req, res) => res.send('Hello World!'))
app.listen();
// app.listen(() => {
//     console.log('Server is running');
// });
