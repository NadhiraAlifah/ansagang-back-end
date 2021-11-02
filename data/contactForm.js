const contactFormModel = require('../contactForm.model')

module.exports = async() => {
    return await contactFormModel.find({})
}