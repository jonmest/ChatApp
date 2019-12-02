const config = require('../config');
const Mongoose = require('mongoose');

Mongoose.connect(config.dbURI);
Mongoose.connection.once('open',() =>{
    console.log('Connected to db')
})

const chatUser = new Mongoose.Schema({
    profileId: String,
    fullName: String,
    profilePic: String
})

let userModel = Mongoose.model('chatUser', chatUser)

module.exports = {
    Mongoose,
    userModel
}