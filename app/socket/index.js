'use strict'
const h = require('../helpers')
module.exports = (io, app) => {
    let allrooms = app.locals.chatRooms
    allrooms.push({
        room: 'Good Food',
        roomID: '001',
        users: []
    })
    allrooms.push({
        room: 'Fitness',
        roomID: '002',
        users: []
    })
    
    io.of('/roomslist').on('connection', socket => {
        console.log('Socket.io connected to client')
        socket.on('getChatrooms', () => {
            socket.emit('chatRoomsList', JSON.stringify(allrooms))
        })

        socket.on('createNewRoom',  newRoomInput => {
            if (!h.findRoomByName(allrooms, newRoomInput)) {
                allrooms.push({
                    room: newRoomInput,
                    roomID: h.randomHex(),
                    users: []
                })
            }

            // Emit updated list
            socket.emit('chatRoomsList', JSON.stringify(allrooms))
            socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms))
        })
    })
}