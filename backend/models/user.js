const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    events: [{
        type: String
    }],
    password: String,
    googleToken: String
    // probably also want authentication stuff here as well
})

module.exports = Users = mongoose.model('Users', userSchema, 'users')