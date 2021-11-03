const availabilityModel = require('../models/availability.model.js')

module.exports = async() => {
    return await availabilityModel.find({})
}

