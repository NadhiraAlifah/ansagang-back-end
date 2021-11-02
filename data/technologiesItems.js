const technologiesItemsModel = require('../technologiesItems.model.js')

module.exports = async() => {
    return await technologiesItemsModel.find({})
}