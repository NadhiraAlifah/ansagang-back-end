const timelineCardsModel = require('../models/timelineCards.model.js')

module.exports = async() => {
    return await timelineCardsModel.find({})
}