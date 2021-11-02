const mongoose = require('mongoose')

const contactDetailsSchema = new mongoose.Schema({
    contact_detail_title: String,
    contact_detail_value: String,
    contact_detail_link: String
})

module.exports = mongoose.model('contact_details', contactDetailsSchema)