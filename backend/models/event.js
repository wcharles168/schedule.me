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

// eventSchema.virtual('url').get(function() {
//     return this.eventId + this.numId
// })
// // middleware that auto-increments id before saving document
// eventSchema.pre('save', function(next) {
//     counter.findByIdAndUpdate({_id: 'eventId'}, {$inc: {seq: 1}, function(error, counter) {
//         if (error) return next(error)
//         this.numId = counter.seq 
//         next()
//     }})
// }) 
module.exports = Events = mongoose.model('Events', eventSchema, 'events')