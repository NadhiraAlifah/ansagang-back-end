const contactFormModel = require('../models/contactForm.model')

module.exports = async() => {
    return await contactFormModel.find({})
}