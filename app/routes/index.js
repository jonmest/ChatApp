'use strict'
const router = require('express').Router()
const passport = require('passport')
const h = require('../helpers')
const config = require('../config')

router.get('/', (req, res, next) => {
    res.render('login')
})

router.get('/rooms', [h.isAuthenticated, (req, res, next) => {
    res.render('rooms', {
        user: req.user,
        host: config.host
    })
}])

router.get('/chat/:id', [h.isAuthenticated, (req, res, next) => {
    // Find a chatroom with given ID
    const getRoom = h.findRoomById(req.app.locals.chatRooms, req.params.id)
    if (getRoom === undefined) {
        return next()
    } else {
        res.render('chatroom', {
            user: req.user,
            host: config.host,
            room: getRoom.room,
            roomID: getRoom.roomID
        })
    }
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