const express = require('express');
const router = express.Router();
const Auth = require('../controllers/Auth');
const home = require('../controllers/Home');

const auth = require('../middleware/authenticate');
const checkRole = require('../middleware/authorize');
const Workspace = require('../controllers/Workspace');
const Assignment = require('../controllers/Assignment');
const Submission = require('../controllers/Submission');


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

/**
 * SUBMISSION ROUTES
 */
router.post('/submissions',auth, Submission.createSubmission);
router.get('/submissions', auth, Submission.getSubmission);
router.get('/submissions/:id', auth, Submission.getSubmissionById);
router.put('/submissions/:id', auth, Submission.updateSubmission);
  
/**
 * ASSIGNMENT ROUTES
 */
router.post('/assignments',auth, Assignment.createAssignment);
router.get('/assignments',auth, Assignment.getAssignment);


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



