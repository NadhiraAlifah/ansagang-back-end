const technologiesItemsModel = require('../models/technologiesItems.model.js')

module.exports = async() => {
    return await technologiesItemsModel.find({})
}