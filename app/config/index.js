'use strict'

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        host: process.env.host || "",
        dbUri: process.env.dbURI,
        sessionSecret: process.env.sessionSecret,
        fb: {
            clientID: process.env.fbClientID,
            clientSecet: process.env.fbClientSecret,
            callbackURL: process.env.host + "/auth/github/callback",
            profileFields: ['id', 'displayName', 'photos']

        }
    }

} else {
    module.exports = require('./development.json')
}