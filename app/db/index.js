const config = require('../config');
const Mongoose = require('mongoose');

Mongoose.connect(config.dbURI);
Mongoose.connection.once('open',()=>{
    console.log('Connected to db');
});

module.exports = {
    Mongoose
}