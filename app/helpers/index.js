const db = require('../db')

// Find a single user based on a key
function findOne (profileID) {
    return db.userModel.findOne({
        'profileId': profileID
    })
}

// Create new user and return instance
function createNewUser (profile) {
    return new Promise((resolve, reject) => {
        let newChatUser = new db.userModel({
            profileId: profile.id,
            fullName: profile.displayName,
            profilePic: profile.photos[0].value || ''
        })

        newChatUser.save(error => {
            if (error) {
                reject(error)
            } else {
                resolve(newChatUser)
            }
        })
    })
}

function findById (id) {
    return new Promise((resolve, reject) => {
        db.userModel.findById(id, (error, user) => {
            if (error) reject (error)
            else resolve (user)
        })
    })
}

function isAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/')
    }
}

module.exports = {
    findOne,
    createNewUser,
    findById,
    isAuthenticated
}