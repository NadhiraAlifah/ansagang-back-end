const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: String,
  subject: String,
  email: String,
  message: String
})

module.exports = mongoose.model('contact_me', schema)