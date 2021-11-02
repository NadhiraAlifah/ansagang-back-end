const skillsMarkupModel = require('../skillsMarkup.model.js')

module.exports = async() => {
    return await skillsMarkupModel.find({})
}