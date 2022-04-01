const mongoose = require("mongoose")

const tutorialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    concept: {
        type: String,
        required: true
    },
    codesnippet: {
        type: String,
        required: true,
        unique: true
    },
    practicequestion: {
        type: String,
        required: true
    },
})

const Tutorial = mongoose.model('tutorial', tutorialSchema)

module.exports = Tutorial