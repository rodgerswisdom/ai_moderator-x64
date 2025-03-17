const express = require('express');
const router = express.Router();
const Auth = require('../controllers/Auth');
const home = require('../controllers/Home');

const auth = require('../middleware/authenticate');
const checkRole = require('../middleware/authorize');
const Workspace = require('../controllers/Workspace');
const Assignment = require('../controllers/Assignment');


/**
 * AUTH ROUTES
 */
router.post('/signup', Auth.signup);
router.post('/login', Auth.login);
// router.get('/profile', Auth.profile);

/**
 * WORKSPACE ROUTES
 */
router.post('/workspaces', auth, Workspace.createWorkspace);
router.get('/workspaces/', auth, Workspace.getWorkspace);
router.get('/workspaces/:id', auth, Workspace.getWorkspaceById);
router.put('/workspaces/:id', auth, Workspace.addStudent);

// /**
//  * SUBMISSION ROUTES
//  */
// router.post('/submissions', auth, checkRole('submit'), home.submission);    
// router.get('/submissions/:id', auth, checkRole('read'), home.submission);
// router.put('/submissions/:id', auth, checkRole('read'), home.submission);   

/**
 * ASSIGNMENT ROUTES
 */
router.post('/assignments', Assignment.createAssignment);
// router.get('/assignments/:id', auth, checkRole('read'), home.assignment);
// router.put('/assignments/:id', auth, checkRole('update_assignment'), home.assignment);
// router.delete('/assignments/:id', auth, checkRole('delete_assignment'), home.assignment);

// /**
//  * REVIEW ROUTES
//  */
// router.post('/reviews', auth, checkRole('create_review'), home.review);
// router.get('/reviews/:id', auth, checkRole('read'), home.review);
// router.put('/reviews/:id', auth, checkRole('update_review'), home.review);
// router.delete('/reviews/:id', auth, checkRole('delete_review'), home.review);

// /** 
//  * AI MODERATION ROUTES
//  */
// router.post('/moderation', auth, checkRole('moderate'), home.moderation);
// router.post('/moderation/check', auth, checkRole('moderate'), home.moderation);

// /**
//  * HOME ROUTE
//  */
// router.get('/', home.index);


module.exports = router;



