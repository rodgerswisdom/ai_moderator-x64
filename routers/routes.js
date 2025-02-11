const express = require('express');
const router = express.Router();
const users = require('../controllers/Auth');
const home = require('../controllers/Home.js');

router.post('/login', users.login());
router.get('/', home.index());

module.exports = routes;


