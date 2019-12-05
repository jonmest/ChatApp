const db = require('../db')
const crypto = require('crypto')

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

function findRoomByName (allrooms, room) {
    const findRoom = allrooms.findIndex((element, index, array) => {
        if (element.room === room) {
            return true
        } else {
            return false
        }
    })
    return findRoom > -1 ? true : false
}

function findRoomById (allrooms, roomID) {
    return allrooms.find((element, index, array) => {
        if (element.roomID === roomID) {
            return true
        } else {
            return false
        }
    })
}

function randomHex () {
    return crypto.randomBytes(24).toString('hex')
}

function addUserToRoom (allrooms, data, socket) {
    let getRoom = findRoomById(allrooms, data.roomID)
    if (getRoom !== undefined) {
        let userID = socket.request.session.passport.user
        let checkUser = getRoom.users.findIndex((element, index, array) => {
            if (element.userID === userID) return true
            else return false
        })

        // If users already present, remove him first
        if (checkUser > -1) {
            getRoom.users.splice(checkUser, 1)
        }

        // Push user into room's user array
        getRoom.users.push({
            socketID: socket.id,
            userID,
            user: data.user,
            userPic: data.userPic
        })

        socket.join(data.roomID)

        return getRoom


    }
    }

function removeUserFromRoom (allrooms, socket) {
    for (let room of allrooms) {
        // Find user
        let findUser = room.users.findIndex((element, index, array) => {
            if (element.socketID === socket.id) {
                return true
            } else {
                return false
            }
        })

        if (findUser) {
            socket.leave(room.roomID)
            room.users.splice(findUser, 1)
            return room
        }
    }
}
module.exports = {
    findOne,
    createNewUser,
    findById,
    isAuthenticated,
    findRoomByName,
    randomHex,
    findRoomById,
    addUserToRoom,
    removeUserFromRoom

}