const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  username: String,
  subject: String,
  email: String,
  message: String
})

module.exports = mongoose.model('contact_me', contactSchema)