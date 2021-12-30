import mongoose from 'mongoose'

const questionsanswersSchema = mongoose.Schema({
  question:String,
  answer:String
})

const QuestionsAnswers = mongoose.model('questions_answers', questionsanswersSchema)

export default QuestionsAnswers