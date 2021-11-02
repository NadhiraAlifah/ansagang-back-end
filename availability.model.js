const mongoose = require('mongoose')

const availabilitySchema = new mongoose.Schema({
  availability: String
})

module.exports = mongoose.model('availability', availabilitySchema)