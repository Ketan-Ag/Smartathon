const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const competitionRoute = require('./Routes/competition')
const compRequestRoute = require('./Routes/compRequests')
const userRoute = require('./Routes/user')
const cors = require('cors');
require('dotenv').config()
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());

const url = `${process.env.DATABASE_URI}`;

const connectionParams={
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ');
        app.listen(8000, () => console.log('Server running on port 8000'));
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

app.use('/user', userRoute)
app.use('/competition', competitionRoute)
app.use('/request',compRequestRoute)





