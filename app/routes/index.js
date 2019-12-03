'use strict'
const router = require('express').Router()
const passport = require('passport')
const h = require('../helpers')

router.get('/', (req, res, next) => {
    res.render('login')
})

router.get('/rooms', [h.isAuthenticated, (req, res, next) => {
    res.render('rooms', {
        user: req.user
    })
}])

router.get('/chat', [h.isAuthenticated, (req, res, next) => {
    res.render('chat', {
        user: req.user
    })
}])

router.get('/getsession', (req, res, next) => {
    res.send('My favourite color: ' + req.session.favColor)
})

router.get('/setsession', (req, res, next) => {
    req.session.favColor = "RED!"
    res.send("Session: set")
})

router.get('/auth/github', passport.authenticate('github'))
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/rooms');
  })

router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/')
})


/**
 * Not found
 */
router.use(function(req, res, next) {
    if (!req.route)
        res.render('404')  
    next();
});

module.exports = router;