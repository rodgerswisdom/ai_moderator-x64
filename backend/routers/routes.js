const express = require('express');
const router = express.Router();
const users = require('../controllers/Auth');
const home = require('../controllers/Home');

const auth = require('../middleware/authenticate');
const checkRole = require('../middleware/authorize');

router.post('/signup', users.signup);
//router.get('/', home.index());
router.post('/login', users.login);

// HOME ROUTE
router.post('/',auth, home.index);
module.exports = router;


