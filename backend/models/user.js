const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    displayName: String,
    userID: String,
    password: String,
    googleToken: String
    // probably also want authentication stuff here as well
})

module.exports = Users = mongoose.model('Users', userSchema, 'users')