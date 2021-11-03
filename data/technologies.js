const technologiesModel = require('../models/technologies.model.js')

module.exports = async() => {
    return await technologiesModel.find({})
}