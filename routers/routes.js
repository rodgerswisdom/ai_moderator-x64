const express = require('require');
const router = require('router');
const users = require('../controllers/Auth.js');
const home = require('../controllers/Home.js');

router.post('/login', users.login());
router.get('/', home.index());

export default routes;


