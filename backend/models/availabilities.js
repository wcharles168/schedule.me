const mongoose = require('mongoose')

const availabilitySchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Events'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users'
    },
    availabilities: [{
        startTime: Date,
        endTime: Date
    }]
})

module.exports = mongoose.model('Availabilities', availabilitySchema, 'availabilities')