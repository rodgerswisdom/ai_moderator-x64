const express = require('express');
const router = express.Router();
const users = require('../controllers/Auth');
const home = require('../controllers/Home');

const auth = require('../middleware/authenticate');
const checkRole = require('../middleware/checkRole');

router.post('/signup', users.signup);
//router.get('/', home.index());
router.post('/login', users.login);

// HOME ROUTE
// router.post('/',auth, checkRole('access_dashboard'), home.index);
router.post('/',auth, home.index);
module.exports = router;


