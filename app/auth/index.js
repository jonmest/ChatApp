'use strict'
const passport = require('passport')
const config = require('../config')
const h = require('../helpers')
const GithubStrategy = require('passport-github').Strategy

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        h.findById(id)
            .then(user => done(null, user))
            .catch(error => console.log('Error when deserializing user.'))
    })

    let authProcessor = (accessToken, refreshToken, profile, done) => {
        // Find user in the local db using profile.id
        h.findOne()
            .then(result => {
                if (result) {
                    done(null, result)
                } else {
                    // Create new user and return
                    h.createNewUser(profile)
                        .then(newChatUser => done(null, newChatUser))
                        .catch(error => console.log('Error when creating new user.'))
                }
            })
        // If found, return the user data using done()

        // If not found, create and invoke done()
    }
    passport.use(new GithubStrategy(config.github, authProcessor))
}