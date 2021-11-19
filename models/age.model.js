const mongoose = require('mongoose')

const ageSchema = new mongoose.Schema({
  age:String,
  date:Number
})

module.exports = mongoose.model('age', ageSchema)