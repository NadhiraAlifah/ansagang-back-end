const ageModel = require('../models/age.model.js')

module.exports = async() => {
    return await ageModel.find({})
}