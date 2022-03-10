const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/main-page'
    // failureRedirect: '/signup',
    // failureFlash: true
}));

router.get('/main-page', (req, res) => {
    res.render('home.html', {partialsUrl: '../profile.html'});
});

module.exports = router;
