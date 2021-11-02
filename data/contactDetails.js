const contactDetailsModel = require('../contactDetails.model.js')

module.exports = async() => {
    return await contactDetailsModel.find({})
}