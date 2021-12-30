import mongoose from 'mongoose'

const timelineCardsSchema = mongoose.Schema({
    timelinecard_year: String,
    timelinecard_action: String
})

const TimelineCards = mongoose.model('timeline_cards', timelineCardsSchema)

export default TimelineCards