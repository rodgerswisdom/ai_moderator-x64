const express = require('require');
const router = require('router');
const users = require('../controllers/Auth.js');
const home = require('../home.js')

router.post('/login', users.login());
router.get('/', home.index());


