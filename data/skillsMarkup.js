const skillsMarkupModel = require('../models/skillsMarkup.model.js')

module.exports = async() => {
    return await skillsMarkupModel.find({})
}