const express = require('express');
const router = express.Router();
const pool = require('../database');

// const {printable} = require('../public/javascript/test.js');

// this is a security risk, you cannot mix functions of public scripts with server side scripts
router.get('/i', (req, res) => {
    res.send('reached')
    printable();
});


router.get('/', (req, res) => {
    res.render('home.html')
});

/**
 * Error: Can't set headers after they are sent.

usually happens when you send several responses for one request. Make sure the following functions are 
called only once per request:

res.json()
res.send()
res.redirect()
res.render()
 */

// this could be somewhere else??
router.post('/add-item', async (req, res) => {
    const { link } = req.body;
    const newLink = {
        link,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO items set ?', [newLink]);
    res.redirect('/cart');
    
});

router.get('/cart', async (req, res) => {
    const links = await pool.query('SELECT * FROM items WHERE user_id = ?', [req.user.id]);
    res.render('cart.html', {itemsLinks: links} )
    
});

router.delete('/delete/:id', async (req, res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM items WHERE ID = ?', [id]);
    res.redirect('/cart');
});

router.get('/buy', async (req, res) => {
    await pool.query('DELETE FROM items');
    console.log('you buy')
    res.redirect('/cart');
});

router.get('/logout', (req, res) => {
    req.logOut(); // terminates the login session
    res.redirect('/');
});

module.exports = router;