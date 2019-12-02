'use strict'

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        host: process.env.host || "",
        dbUri: process.env.dbURI
    }

} else {
    module.exports = require('./development.json')
}