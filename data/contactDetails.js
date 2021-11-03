const contactDetailsModel = require('../models/contactDetails.model.js')

module.exports = async() => {
    return await contactDetailsModel.find({})
}