const mongoose = require('mongoose')

const questionsanswersSchema = new mongoose.Schema({
  question:String,
  answer:String
})

module.exports = mongoose.model('questions_answers', questionsanswersSchema)