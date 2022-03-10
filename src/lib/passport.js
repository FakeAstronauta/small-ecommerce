const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
// const pool = require('../database');
// const helpers = require('../lib/helpers')

passport.use('signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
    // passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
    // const {fullname} =req.body;
    const newUser = {
        username,
        password
        // fullname
    };
    newUser.password = await helpers.encryptedPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));