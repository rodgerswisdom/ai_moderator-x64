const express = require('express');
const models = require('../utils/db.js');

class Home{
    static async function index(req, res){
        message = "ai_moderator";
        return message;
    }
}
module.exports = Home;
