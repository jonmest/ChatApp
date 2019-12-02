'use strict'
const express = require('express')
const app = express()
const chatTap = require('./app')

app.set('port', process.env.PORT || 3000)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(chatTap.session)
app.use('/', chatTap.router)

app.listen(app.get('port'), () => {
    console.log()
})