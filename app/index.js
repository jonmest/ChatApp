'use strict'
const router = require('express').Router()

router.get('/', (req, res, next) => {
    res.render('login')
})

router.get('/rooms', (req, res, next) => {
    res.render('rooms')
})

router.get('/chat', (req, res, next) => {
    res.render('chat')
})

/**
 * Not found
 */
router.use(function(req, res, next) {
    if (!req.route)
        res.render('404')  
    next();
});


module.exports = {
    router: router
}