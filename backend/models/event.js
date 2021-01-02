const mongoose = require('mongoose')

const counterSchema = mongoose.Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
})

const counter = mongoose.model('counter', counterSchema)

const eventSchema = new mongoose.Schema({
    // numId: {type: Number, default: 0},
    eventId: String, // unique string for event url (could also use _id)
    name: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users'
    },
    startDate: Date,
    endDate: Date,
    startTime: Number, // number of seconds since 00:00:00
    endTime: Number,
    timeZone: String
}, { timestamps: true}) // createdAt and updatedAt

module.exports = Events = mongoose.model('Events', eventSchema, 'events')