const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/main-page'
    // failureRedirect: '/signup',
    // failureFlash: true
}));

router.post('/signin', (req, res, next) => {
    passport.authenticate('signin', {
    successRedirect: '/main-page'
})(req, res, next)});

router.get('/main-page', (req, res) => {
    res.render('home.html');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/main-page');
});


module.exports = router;
