const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport =require('passport');
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.post('/addFriend',passport.checkAuthentication,usersController.addFriend);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.get('/reset-password',usersController.reset);
router.post('/forget-password',usersController.forget);
router.get('/passwordReset',usersController.resetform);
router.post('/newpassword',usersController.newPassword);

router.post('/create',usersController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),usersController.createSession);
router.get('/sign-out',usersController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'users/sign-in'}),usersController.createSession);

module.exports = router;