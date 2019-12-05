'use strict'
const express = require('express')
const app = express()
const chatTap = require('./app')
const passport = require('passport')

app.set('port', process.env.PORT || 3000)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(chatTap.session)
app.use(passport.initialize())
app.use(passport.session())
app.use('/', chatTap.router)

chatTap.ioServer(app).listen(app.get('port'), () => {
    console.log()
})