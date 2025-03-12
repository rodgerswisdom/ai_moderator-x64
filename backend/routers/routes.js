const express = require('express');
const router = express.Router();
const users = require('../controllers/Auth');
const home = require('../controllers/Home');

router.post('/signup', users.signup);
//router.get('/', home.index());
router.post('/login', users.login);

// HOME ROUTE
router.post('/', home.index); 
module.exports = router;


