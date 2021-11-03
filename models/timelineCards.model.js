const mongoose = require('mongoose')

const timelineCardsSchema = new mongoose.Schema({
    timelinecard_year: String,
    timelinecard_action: String
})

module.exports = mongoose.model('timeline_cards', timelineCardsSchema)