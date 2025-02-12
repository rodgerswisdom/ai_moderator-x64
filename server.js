const path = require('path');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routers/routes');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;


app.use('/api', routes);
app.get('/', (req, res)=>{
    res.send("<h1>AI Moderator</h1>")
});

app.listen(port, (error) =>{
    if(!error)
        console.log(`Server Started http://localhost:${port}`);
    else 
        console.log("Error occurred, server can't start", error);
    }
);
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected!'))
  .catch(error => console.error(error));

