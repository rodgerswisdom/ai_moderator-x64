
const mongoose = require('mongoose');

const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req,res)=>{
    res.send("<h1>Hello World </h1>");
   }
);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is listening on http://localhost:"+PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));

