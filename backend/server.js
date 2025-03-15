const path = require('path');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routers/routes');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api', routes);

app.listen(port, (error) =>{
    if(!error)
        console.log(`Server Started http://localhost:${port}`);
    else 
        console.log("Error occurred, server can't start", error);
    }
);

mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log('Database Connected!'))
.catch(error => console.error(error));

